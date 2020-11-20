const path = require('path')

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config.watch = true
  config.module.rules.push({
    test: /\.less$/,
    loaders: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
          modules: {
            mode: 'local',
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            // localIdentName: '[sha1:hash:hex:4]',
            context: path.resolve(__dirname, 'src'),
            hashPrefix: 'custom'
          }
        }
      },
      require.resolve('less-loader')
    ]
  })

  // Return the altered config
  return config
}
