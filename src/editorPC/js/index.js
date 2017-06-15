import Vue from 'vue'
import store from '../store/index.js'
import YHEdior from './yh-editor.vue'

Vue.config.debug = true;//开启错误提示
var pageVue = new Vue({
    el:'#app',
    store,
    components:{
        'yh-editor':YHEdior
    },
    data(){
        return {
            title:'EDITOR PC'
        }
    }
})