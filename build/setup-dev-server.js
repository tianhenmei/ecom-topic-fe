const path = require('path')
const webpack = require('webpack')
// const fs = require('fs')
const MFS = require('memory-fs')

// const output = path.resolve(__dirname, '../build')

const readFile = (clientConfig,tempfs, file) => {
    try {
        return tempfs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    } catch (e) {}
}

module.exports = function setupDevServer (app,item, cb) {
	let clientConfig = require('./webpack.client.config')('editorPC',item),
		serverConfig = require('./webpack.server.config')('editorPC',item),
		bundle,
		clientManifest,
		resolve,
		temp;
	const readyPromise = new Promise(r => { resolve = r })
	const ready = (...args) => {
		resolve()
		cb(...args)
	}

	// modify client config to work with hot middleware
	clientConfig.entry.index = ['webpack-hot-middleware/client', clientConfig.entry.index]
	clientConfig.output.filename = '[name].js'
	clientConfig.plugins.push(
		// new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)

	// dev middleware
	const clientCompiler = webpack(clientConfig)
	const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		noInfo: true
	})
	app.use(devMiddleware)
	clientCompiler.plugin('done', stats => {
		stats = stats.toJson()
		stats.errors.forEach(err => console.error(err))
		stats.warnings.forEach(err => console.warn(err))
		if (stats.errors.length) return
		
		temp = readFile(
			clientConfig,
			devMiddleware.fileSystem,
			'vue-ssr-client-manifest.json'
		)
		clientManifest = JSON.parse(temp ? temp : "{}")
		if (bundle) {
			ready(bundle, {
				clientManifest
			})
		}
	})
	// watch and update server renderer
	const serverCompiler = webpack(serverConfig)
	const mfs = new MFS()
	serverCompiler.outputFileSystem = mfs
	serverCompiler.run((err,stats) => {
		if (err) throw err
		stats = stats.toJson()
		if (stats.errors.length) return
		temp = readFile(
			clientConfig,
			mfs,
			'vue-ssr-server-bundle.json'
		)
		bundle = JSON.parse(temp ? temp : "{}")
		if (clientManifest) {
			ready(bundle, {
				clientManifest
			})
		}
	})

	return readyPromise
}
