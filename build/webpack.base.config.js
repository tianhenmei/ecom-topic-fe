const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

function getBaseConfig(sysname,item){ // editorPC
	return {
		devtool: isProd
			? false
			: '#cheap-module-source-map',
		output: {
			path: path.resolve(__dirname, '../dist/'+sysname+'/'+(item == 'h5' ? 'js-h5' : 'js-pc')),
			publicPath: '/dist/',
			filename: '[name].[hash].js',
			hashDigestLength:8
		},
		resolve: {
			alias: {
				'public': path.resolve(__dirname, '../public')
			}
		},
		module: {
			noParse: /es6-promise\.js$/, // avoid webpack shimming process
			rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueConfig
			},{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[ext]?[hash]'
				}
			},{
				test: /\.css$/,
				use: isProd
				? ExtractTextPlugin.extract({
					use: 'css-loader?minimize',
					fallback: 'vue-style-loader'
				})
				: ['vue-style-loader', 'css-loader']
			}]
		},
		performance: {
			maxEntrypointSize: 300000,
			hints: isProd ? 'warning' : false
		},
		plugins: isProd
			? [
				new webpack.optimize.UglifyJsPlugin({
					compress: { warnings: false }
				}),
				new ExtractTextPlugin({
					filename: (item == 'h5' ? 'm_index' : 'index')+'.[hash].css'
				})
			]: [
				new FriendlyErrorsPlugin()
			]
	}
}
module.exports = getBaseConfig
