var path = require('path');
var webpack = require('webpack');
// var webpackConfig = require('./webpack.config.js');
// html不引用js，动态注入
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离CSS单独成文件
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var ExtractTextPlugin2 = require('extract-text-webpack-plugin')


function getConfigPlugins(systemName,name,plugins){
    var defalutPlugins = [
            new webpack.DefinePlugin({
                '__isProd__':  process.argv.includes('--production')
            }),
            // 添加三个插件
            // new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'lib',
                filename: 'js/lib.min.js',
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new ExtractTextPlugin("css/index.css"),
            new ExtractTextPlugin2("css/[name].css"),
            new HtmlWebpackPlugin({
                filename: `src/${systemName}/index.html`,
                template: path.resolve(__dirname, `../src/${systemName}/index.html`),
                chunks:['jquery','lib','index'],  //'jquery'
                inject: true
            })
        ],
        distPlugins = [
            new webpack.DefinePlugin({
                '__isProd__':  process.argv.includes('--production')
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'lib',
                filename: 'js/lib.min.js',
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false,
                }
            }),
            new ExtractTextPlugin("css/[name].[hash].css"),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.resolve(__dirname, `../src/${systemName}/index.html`),
                inject: true,
                minify: {
                    removeComments: false,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    minifyCSS: true,
                    minifyJS: true
                }
            })
        ],
        vuePlugins = [
            // new ExtractTextPlugin(name+".css"),
            // new webpack.optimize.UglifyJsPlugin({
                // compress: {
                //     warnings: false
                // },
                // output: {
                //     comments: false,
                // }
            // })
        ],
        jsPlugins = [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false,
                }
            })
        ],
        cssPlugins = [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false,
                }
            })
        ],
        pluginsObject = {
            'defalutPlugins':defalutPlugins,
            'distPlugins':distPlugins,
            'vuePlugins':vuePlugins,
            'jsPlugins':jsPlugins,
            'cssPlugins':cssPlugins
        }
    return pluginsObject[plugins]
}

function getConfig(systemName,name,plugins='defalutPlugins'){
    var cssLoader = { 
        test: /\.css$/, 
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        // loader: "style!css"
        use:ExtractTextPlugin.extract({
            fallback:'style-loader', 
            use:['css-loader','postcss-loader','sass-loader'],
            allChunks:true
        })
    };
    if(plugins == 'cssPlugins'){
        cssLoader = {
            test: /\.css$/, 
            use: [{
                loader: 'style-loader'
            },{
                loader: 'css-loader',
                options: {
                importLoaders: 1
                }
            },{
                loader: 'postcss-loader'
            },{
                loader: 'sass-loader',
                options: {
                noIeCompat: true
                }
            }]
        }
    }
    var config = {
            entry: {
                lib:['vue','vuex'],
                index:[
                    // './build/dev-client',
                    path.resolve(__dirname,`../src/${systemName}/js/index.js`)
                ]
            },
            output: {
                path: path.resolve(__dirname,'../dist',systemName+'/js/'),//path.resolve(__dirname, `../dist/${systemName}/js/`),
                publicPath: '/',
                filename:'js/[name].js'
                // filename: name+'.js',//'[name].[hash].js',
                // chunkFilename: name+'.js'//'[id].[chunkhash].js'
            },
            resolve: {
                extensions: ['.js', '.vue'],
                alias: {
                    'vue': 'vue/dist/vue.js',  //./node_modules/vue/dist/vue.js'//
                }
            },
            module:{
                rules: [{
                    // 使用vue-loader 加载 .vue 结尾的文件
                    test: /\.vue$/,
                    // loader: 'vue'
                    exclude: /node_modules/,  
                    loader: 'vue-loader',
                    // options: {
                    //     loaders: {
                    //         css: ExtractTextPlugin.extract({
                    //             use: [{
                    //                 loader: 'css-loader',
                    //                 options: {
                    //                     minimize: process.env.NODE_ENV === 'production',
                    //                     sourceMap: false
                    //                 }
                    //             }],
                    //             fallback: 'vue-style-loader'
                    //         })
                    //     }
                    // }
                },{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query:{
                        presets: ['es2015'],  // , 'stage-0'
                        plugins: ['syntax-dynamic-import']
                    }
                },{
                    test: /\.woff|\.eot|\.svg|\.ttf|\.otf|\.png|\.jpg|\.gif|\.jpeg/,
                    loader: 'url-loader'
                },{
                    test: /\.scss$/,
                    use: ExtractTextPlugin2.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    }),
                    exclude: /node_modules/
                },{
                    test: /\.less$/,
                    use: ExtractTextPlugin2.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'less-loader']
                    })
                },
                    cssLoader
                ]
            },
            plugins: getConfigPlugins(systemName,name,plugins)
        },
        devClient = './build/dev-client';
    Object.keys(config.entry).forEach(function (name, i) {
        var extras = [devClient]
        config.entry[name] = extras.concat(config.entry[name])
    })
    return config;
}

module.exports = {
    getConfig
};