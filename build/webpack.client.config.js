const glob = require('glob')
const webpack = require('webpack')
const merge = require('webpack-merge')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

function getClientConfig(sysname,item){  // editorPC
	let base = require('./webpack.base.config')(sysname,item)
    return merge(base, {
		entry: {
			index: './server-renderer/'+sysname+'/'+item+'/entry-client.js'
		},
		resolve: {
			alias: {
				'create-api': './create-api-client.js'
			}
		},
		plugins: [
			// strip dev-only code in Vue source
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
				'process.env.VUE_ENV': '"client"'
			}),
			// extract vendor chunks for better caching
			new webpack.optimize.CommonsChunkPlugin({
				name: 'lib.min',
				minChunks: function (module) {
				// a module is extracted into the vendor chunk if...
				return (
					// it's inside node_modules
					/node_modules/.test(module.context) &&
					// and not a CSS file (due to extract-text-webpack-plugin limitation)
					!/\.css$/.test(module.request)
				)
				}
			}),
			// new ExtractTextPlugin({
			// 	filename: (item == 'h5' ? 'm_index' : 'index')+'.css'
			// }),
		// // extract webpack runtime & manifest to avoid vendor chunk hash changing
		// // on every build.
			new webpack.optimize.CommonsChunkPlugin({
				name: 'manifest'
			}),
			new VueSSRClientPlugin()
		]
  	})
}


module.exports = getClientConfig
