// let CompanyPosition_style1 = require('../src/editorPC/components-h5/CompanyPosition/style1/index.vue')
// // import CompanyPosition_style2 from '../src/editorPC/components-h5/CompanyPosition/style2/index.vue'
// // import List_style1 from '../src/editorPC/components-h5/List/style1/index.vue'
// // import Image_style1 from '../src/editorPC/components-h5/Image/style1/index.vue'
// const Vue = require('vue')
// let fs = require('fs'),
//     path = require('path'),
//     components = {
//         'CompanyPosition_style1':CompanyPosition_style1,
//         // 'CompanyPosition_style2':CompanyPosition_style2,
//         // 'List_style1':List_style1,
//         // 'Image_style1':Image_style1
//         // 'CompanyPosition_style1':require('../src/editorPC/components-h5/CompanyPosition/style1/index.vue'),
//         // 'CompanyPosition_style2':require('../src/editorPC/components-h5/CompanyPosition/style2/index.vue'),
//         // 'List_style1':require('../src/editorPC/components-h5/List/style1/index.vue'),
//         // 'Image_style1':require('../src/editorPC/components-h5/Image/style1/index.vue')
//     },
//     loadStatus = 0,
//     finishLength = 0

// let load = function(path, name) {
//     if (name) {
//         return require(path + name);
//     }
//     return require(path);
// };
// function loadFile(dir,name){
//     let patcher = {},
//         _load = load.bind(null, dir,name);

//     // patcher.__defineGetter__(name, _load)

//     return _load;
// }
let webpack = require('webpack')
let MFS = require('memory-fs')
let serverConfig = require('../build/webpack.server.config')

function recoveryElements(elements){
    let data = [],
        childElements = []
    for(let i = 0; i < elements.length; i++){
        data.push(JSON.parse(JSON.stringify(elements[i])))
        data[i].module = components[data[i]['yh-module']]
        childElements = elements[i].props.elements
        if(childElements && childElements.length > 0){
            data[i].props.elements = []
            data[i].props.elements = recoveryElements(childElements)
        }
    }
    return data
}
const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.resolve(__dirname, 'dist',file), 'utf-8')
    } catch (e) {}
}
/**
 * createAppH5 : 创建移动端HTML
 * router: express 的 router
 * elemData: 渲染页面组件的数据
 * pageData: 页面的基本数据，如用到了哪些组件，当前的count值
 * cb: 回调函数
 */
let {createApp} = require('../server-renderer/editorPC/app.js')
module.exports = function createAppH5(filename,pagedata,data){
    return new Promise((resolve, reject) => {
        const s = isDev && Date.now()
        const dataString = fs.readFileSync(path.resolve(__dirname,'../../publish/'+filename+'/js/index.json'),'utf-8')
        const data = JSON.parse(dataString)
        const { app,store } = createApp(pagedata,data)

        console.log(context)
        console.log(data)
        
        resolve(app)
    })
}
// module.exports = function createAppH5(router,elemData,pagedata,cb){
//     let bundle, clientManifest
//     let resolve
//     const readyPromise = new Promise(r => { resolve = r })
//     const ready = (...args) => {
//         resolve()
//         cb(...args)
//     }
//     // watch and update server renderer
// 	const serverCompiler = webpack(serverConfig)
// 	const mfs = new MFS()
// 	serverCompiler.outputFileSystem = mfs
// 	serverCompiler.watch({}, (err, stats) => {
// 		if (err) throw err
// 		stats = stats.toJson()
// 		if (stats.errors.length) return
//         ready({
            
//         }, {
            
//         })
//         // ready(elemData,pagedata)
// 		// read bundle generated by vue-ssr-webpack-plugin
// 		// bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
// 		// if (clientManifest) {
// 			// ready(bundle, {
// 			// 	// clientManifest
// 			// })
// 		// }
// 	})

//   	return readyPromise










//     // let Module = null,
//     //     m = null,
//     //     code = '',
//     //     a = null,
//     //     filename = '',
//     //     filepath = ''
//     // // 新建后会立即执行
//     // loadStatus = 0
//     // finishLength = pagedata.includes.length
//     // // for(let i = 0; i < finishLength; i++){
//     // //     Module = module.constructor
//     // //     m = new Module()
//     // //     filename = pagedata.includes[i]
//     // //     // filepath = '../src/editorPC/components-h5/'+filename.replace(/[_]/g,'/')+'/index.vue'
//     // //     filepath = '../dist/editorPC/components-h5/'+filename+'.js'
//     // //     code = fs.readFileSync(path.resolve(__dirname,filepath),'utf-8')//'module.exports = function () {console.log("abc");}'; 
//     // //     m._compile(code, filename+'.js');
//     // //     components[filename] = m.exports; //require('../dist/editorPC/components-h5/'+filename+'.js');//require(/* webpackChunkName:name */'../dist/editorPC/components-h5/'+pagedata.includes[i]+'.js')
//     // // }
//     // let elements = recoveryElements(elemData.elements)
//     // // console.log(m._compile)
//     // return new Vue({
//     //     components:components,
//     //     data: {
//     //         elements: elements
//     //     },
//     //     template: `<div yh-editor-content ref="yh-editor-content">
//     //                      <div v-for="(element,index) in elements" :is="element.module" 
//     //                         :props="element.props"
//     //                         :path="element.path"></div>
//     //                 </div>`
//     // })
//     // // return new Promise((resolve,reject) => {
//     // //     // 新建后会立即执行
//     // //     loadStatus = 0
//     // //     finishLength = pagedata.includes.length
//     // //     for(let i = 0; i < finishLength; i++){
//     // //         console.log(includes[i])
//     // //         components[includes[i]] = require(/* webpackChunkName:name */'../dist/editorPC/components-h5/'+includes[i]+'.js')
//     // //         loadStatus++
//     // //         if(loadStatus == finishLength){
//     // //             resolve(
//     // //                 new Vue({
//     // //                     components:components,
//     // //                     data: {
//     // //                         elements: elemData.elements
//     // //                     },
//     // //                     template: `<div yh-editor-content ref="yh-editor-content">
//     // //                                     <div v-for="(element,index) in elements" :is="element.module" 
//     // //                                         :props="element.props"
//     // //                                         :path="element.path"></div>
//     // //                                 </div>`
//     // //                 })
//     // //             )
//     // //         }
//     // //     }
//     // // })
//     // // return new Vue({
//     // //     data: {
//     // //         url: elemData.url
//     // //     },
//     // //     template: `<div>访问的 URL 是： {{ url }}</div>`
//     // // })
// }