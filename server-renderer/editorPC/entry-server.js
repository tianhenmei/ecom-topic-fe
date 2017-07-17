import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from '../../server-renderer/editorPC/App.vue'
Vue.use(Vuex)

let store = new Vuex.Store({
    state:{

    }
})
// 通用入口

function createApp(pagedata={},data={}) {
    // console.log(pagedata)
    // store.state = data
    const app = new Vue({
        store:new Vuex.Store({
            state:data
        }),
        created(){
            // console.log(data.elements)
            // console.log(this.$store)
        },
        render:h => h(App)
    })
    // console.log(app)
    return { app }
}

export default (filename,pagedata,data) => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
    return new Promise((resolve,reject) => {
        let host = 'http://localhost:9000/'
        axios.get(host+'editorPC/getPageData',{
            id:'10000',
            name:'text'
        }).then(response => {
            let content = response.data.content
            
            // console.log(response.data)
            const { app } = createApp(pagedata,content)
            // console.log(app)

            resolve(app)
        },response => {
            console.log(response.body.message)
        })
    })
}