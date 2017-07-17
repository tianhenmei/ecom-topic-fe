import Vue from 'vue'
import Vuex from 'vuex'
import App from '../../server-renderer/editorPC/App.vue'
Vue.use(Vuex)

let store = new Vuex.Store({
    state:{

    }
})
// 通用入口

function createApp(pagedata={},data={}) {
    store.state = data
    const app = new Vue({
        store,
        render:h => h(App)
    })
    return { app }
}

export default (filename,pagedata,data) => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
    return new Promise((resolve,reject) => {
        const dataString = fs.readFileSync(path.resolve(__dirname,'../../publish/'+filename+'/js/index.json'),'utf-8')
        console.log(dataString)
        const data = JSON.parse(dataString)
        const { app } = createApp(pagedata,data)

        console.log(context)
        console.log(data)

        resolve(app)
    })
}