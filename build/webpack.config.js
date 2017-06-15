// nodejs 中的path模块
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离CSS单独成文件
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var config = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    // entry: path.resolve(__dirname, '../src/demo/js/index.js'),
    entry: {
        // index: ['webpack-hot-middleware/client', path.resolve(__dirname, '../src/demo/js/index.js')]
        index:[
            // './build/dev-client',
            path.resolve(__dirname, '../src/demo/js/index.js')
        ]
    },
    // 输出配置
    output: {
        path: path.resolve(__dirname, '../dist/vue/'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.js',  //./node_modules/vue/dist/vue.js'//
        }
    },
    // module: {
    //     loaders: [{
    //         // 使用vue-loader 加载 .vue 结尾的文件
    //         test: /\.vue$/,
    //         // loader: 'vue'
    //         exclude: /node_modules/,  
    //         loader: 'vue-loader'
    //     },{
    //         test: /\.js$/,
    //         loader: 'babel-loader',
    //         exclude: /node_modules/
    //     },{
    //         test: /\.woff|\.eot|\.svg|\.ttf|\.otf|\.png|\.jpg|\.gif|\.jpeg/,
    //         loader: 'url-loader'
    //     },{ 
    //         test: /\.css$/, 
    //         // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    //         loader: "style!css"
    //     }]
    // },
    // babel:{
    //     presets: ['es2015', 'stage-0'],
    // },
    // vue:{
    //     loaders:{
    //         js:'babel'
    //     }
    // },
    // plugins: [
    //     // 添加三个插件
    //     // new webpack.optimize.OccurenceOrderPlugin(),
    //     new webpack.HotModuleReplacementPlugin(),
    //     new webpack.NoErrorsPlugin(),
    //     new HtmlWebpackPlugin({
    //         filename: 'src/demo/index.html',
    //         template: path.resolve(__dirname, '../src/demo/index.html'),
    //         inject: true
    //     })
    // ]
}

// 动态向入口配置中注入 webpack-hot-middleware/client
// var devClient = 'webpack-hot-middleware/client';
// var devClient = './build/dev-client';
// Object.keys(config.entry).forEach(function (name, i) {
//     var extras = [devClient]
//     config.entry[name] = extras.concat(config.entry[name])
// })

module.exports = config