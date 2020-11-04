const Path = require('path')
const proxies = require('./proxy.config.json')
const ParcelProxyServer = require('parcel-proxy-server')

// parcel options, such as publicUrl, watch, sourceMaps... none of which are needed for this proxy server configuration
const parcelOptions = {
  outDir: './build'
}

// point parcel at its "input"
const entryPoint = Path.join(__dirname, '../example', 'index.html')

// configure the proxy server
const server = new ParcelProxyServer({
  entryPoint,
  parcelOptions,
  proxies
})

// the underlying parcel bundler is exposed on the server
// and can be used if needed
server.bundler.on('buildEnd', () => {
  console.log('Build completed!')
})

// start up the server
server.listen(12345, () => {
  console.log('Parcel proxy server has started at http://localhost:12345/')
})
