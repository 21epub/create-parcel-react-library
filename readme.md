# create-parcel-react-library

> CLI for creating reusable, modern React ts libraries using Rollup and Parcel.

[![NPM](https://img.shields.io/npm/v/create-parcel-react-library.svg)](https://www.npmjs.com/package/create-parcel-react-library) [![Build Status](https://travis-ci.com/21epub/create-parcel-react-library.svg?branch=master)](https://travis-ci.com/21epub/create-parcel-react-library) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Intro

This package was inspired by [create-react-library](https://github.com/transitive-bullshit/create-react-library)

Simplify the progress of creating a react-ts library .

Take advantage of Parcel and Rollup .

## Features

- [x] Easy-to-use CLI
- [x] Handles all modern JS features
- [x] Bundles `commonjs` and `es` module formats
- [x] [parcel](https://parceljs.org/) for example usage and local dev
- [x] [Rollup](https://rollupjs.org/) for bundling
- [x] [Babel](https://babeljs.io/) for transpiling
- [x] [Jest + testing-library](https://facebook.github.io/jest/) for react testing
- [x] Supports complicated peer-dependencies
- [x] Supports CSS modules
- [x] TypeScript Only
- [x] Sourcemap creation
- [x] lint-staged support
- [X] Conventional commit by `git-cz`
- [X] Standard-version by `npm run release`
- [X] github Actions
- [X] Format on Save ( Vscode Editor )
- [X] Travis CI & Code coverage by custom configration

## Install globally

This package requires `node >= 10`.

```bash
npm install -g @21epub/create-parcel-react-library
```

## Usage with npx

```bash
npx @21epub/create-parcel-react-library
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))_

## Creating a New Module

```bash
create-parcel-react-library
```

Answer some basic prompts about your module, and then the CLI will perform the following steps:

- copy over the template
- install dependencies via yarn or npm
- install peers vis yarn or npm (You have to do this since peers will not auto installed , dev start will cause error !)
- initialize local git repo

At this point, your new module is ready and is all setup for local development.

## Development

There's only one thing to do your development is enjoy your coding in `src/` and your example in `example/`

```bash
npm start # start your example dev code  
```

Now, anytime you make a change to your library in `src/` or `example/` will live-reload your parcel dev so you can iterate on your component in real-time.

#### Publishing to npm

```bash
npm run release # Version and changelog
git push --follow-tags origin master
npm publish
```

This builds `commonjs` and `es` versions of your module to `dist/` and then publishes your module to `npm`.

Make sure that any npm modules you want as peer dependencies are properly marked as `peerDependencies` in `package.json`. The rollup config will automatically recognize them as peers and not try to bundle them in your module.

## License

MIT © [21epub](https://github.com/21epub)
