'use strict'

const handlebars = require('handlebars')
const execa = require('execa')
const fs = require('fs')
const globby = require('globby')
const mkdirp = require('make-dir')
const ora = require('ora')
const path = require('path')
const pEachSeries = require('p-each-series')

const pkg = require('../package')

const templateBlacklist = new Set([
  'example/public/favicon.ico',
  'example/public/.gitignore',
  '.git'
])

module.exports = async (info) => {
  const { manager, template, name, templatePath, git } = info

  // handle scoped package names
  const parts = name.split('/')
  info.shortName = parts[parts.length - 1]

  const dest = path.join(process.cwd(), info.shortName)
  info.dest = dest
  await mkdirp(dest)

  const source =
    template === 'custom'
      ? path.join(process.cwd(), templatePath)
      : path.join(__dirname, '..', 'template', template)
  const files = await globby(source.replace(/\\/g, '/'), {
    dot: true
  })

  {
    const promise = pEachSeries(files, async (file) => {
      return module.exports.copyTemplateFile({
        file,
        source,
        dest,
        info
      })
    })
    ora.promise(promise, `Copying ${template} template to ${dest}`)
    console.log()
    await promise
  }

  {
    console.log()
    console.log('Initializing npm dependencies. This will take a minute.')
    console.log()

    const rootP = module.exports.initPackageManagerRoot({ dest, info })
    ora.promise(rootP, `Running ${manager} install in root directory`)
    await rootP

    const peerP = module.exports.initPackageManagerPeers({ dest, info })
    ora.promise(
      peerP,
      `Running ${manager} install peerDependencies in root directory`
    )
    await peerP
  }

  if (git) {
    const promise = module.exports.initGitRepo({ dest })
    ora.promise(promise, 'Initializing git repo')
    await promise
  }

  return dest
}

module.exports.copyTemplateFile = async (opts) => {
  const { file, source, dest, info } = opts

  const fileRelativePath = path.relative(source, file).replace(/\\/g, '/')
  if (fileRelativePath === '.git') {
    return
  }

  const destFilePath = path.join(dest, fileRelativePath)
  const destFileDir = path.parse(destFilePath).dir
  console.log(fileRelativePath)

  await mkdirp(destFileDir)

  if (templateBlacklist.has(fileRelativePath)) {
    const content = fs.readFileSync(file)
    fs.writeFileSync(destFilePath, content)
  } else {
    const template = handlebars.compile(fs.readFileSync(file, 'utf8'))
    const content = template({
      ...info,
      yarn: info.manager === 'yarn',
      files: '"files":["dist"]'
    })

    fs.writeFileSync(destFilePath, content, 'utf8')
  }

  return fileRelativePath
}

module.exports.initPackageManagerRoot = async (opts) => {
  const { dest, info } = opts

  const commands = [
    {
      cmd: info.manager,
      args: ['install'],
      cwd: dest
    }
  ]

  return pEachSeries(commands, async ({ cmd, args, cwd }) => {
    return execa(cmd, args, { cwd })
  })
}

module.exports.initPackageManagerPeers = async (opts) => {
  const { dest, info } = opts

  const commands = [
    {
      cmd: info.manager,
      args: ['run', 'install-peers'],
      cwd: dest
    }
  ]

  return pEachSeries(commands, async ({ cmd, args, cwd }) => {
    return execa(cmd, args, { cwd })
  })
}

module.exports.initGitRepo = async (opts) => {
  const { dest } = opts

  const gitIgnorePath = path.join(dest, '.gitignore')
  fs.writeFileSync(
    gitIgnorePath,
    `
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
node_modules

# builds
build
dist
coverage
.rpt2_cache

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

#others

npm-debug.log*
yarn-debug.log*
yarn-error.log*
.cache
*.log
.eslintcache

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
`,
    'utf8'
  )

  const commands = [
    {
      cmd: 'git',
      args: ['init'],
      cwd: dest
    },
    {
      cmd: 'git',
      args: ['add', '.'],
      cwd: dest
    },
    {
      cmd: 'git',
      args: ['commit', '-m', `init ${pkg.name}@${pkg.version}`],
      cwd: dest
    }
  ]

  return pEachSeries(commands, async ({ cmd, args, cwd }) => {
    return execa(cmd, args, { cwd })
  })
}
