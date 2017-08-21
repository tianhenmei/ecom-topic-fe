import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
Vue.use(Vuex)

let store = new Vuex.Store({
        state:{

        }
    }),
    components = {},
    loadStatus = 0,
    finishLength = 0
// 通用入口

function createApp(pagedata={},data={}) {
    store.state = data
    const app = new Vue({
        store:new Vuex.Store({
            state:{
                elements:initModule(data.elements)
            }
        }),
        render:h => h(App)
    })
    return { app }
}

function initModule(elements){
    let i = 0
    for(i = 0 ;i < elements.length; i++){
        elements[i].module = components[elements[i]['yh-module']]
        if(elements[i].props.elements && elements[i].props.elements.length > 0){
            elements[i].props.elements = initModule(elements[i].props.elements)
        }
    }
    return elements
}

function importComponents(includes,callback){
    let i = 0,
        path = '',
        self = this
    loadStatus = 0
    finishLength = includes.length
    for(i = 0; i < includes.length; i++){
        path = includes[i].replace('_','/');
        (function(yhmodule,path){
            import(/* webpackChunkName:name */'../../../src/editorPC/components-h5/'+path+'/index.vue')
            .then(ModuleStyle => {
                components[yhmodule] = ModuleStyle
                loadStatus++
                if(loadStatus == finishLength){
                    callback()
                }
            }).catch(function(err) {
                console.log('Failed to load moment: '+path+'暂无移动端');
                loadStatus++
                if(loadStatus == finishLength){
                    callback()
                }
            });
        })(includes[i],path)
    }
    if(i == 0){
        callback()
    }
}

export default (context) => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
    return new Promise((resolve,reject) => {
        importComponents(context.pagedata.includes,function(){
            const { app } = createApp(context.pagedata.includes,context.data)
            
            app.$mount('#app')
            resolve(app)
        })
        // const dataString = fs.readFileSync(path.resolve(__dirname,'../../publish/'+context.filename+'/js/index.json'),'utf-8')
        // console.log(dataString)
        // const data = JSON.parse(dataString)
        // const { app } = createApp(context.pagedata,context.data)

        // resolve(app)
    })
}