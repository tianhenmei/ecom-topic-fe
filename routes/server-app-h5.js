let webpack = require('webpack')
let MFS = require('memory-fs')
let serverConfig = require('../build/webpack.server.config')('editorPC')

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
let {createApp} = require('../server-renderer/editorPC/h5/app.js')
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
