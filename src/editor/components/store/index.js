import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        currentPage:0,
        pages:[],
        // 临时与页面无关数据
        defaultPage:{
            background:{
                backgroundColor:'transparent',
                backgroundImage:'',
                backgroundRepeat:'no-repeat',
                backgroundPosition:'0 0',
                backgroundSize:'100% 100%'
            },
            elements:[]
        },
        data:{
            oparent:null,  // 临时父级
            ochild:null,  // 临时子级
            parent:null,
            pageIndex:-1,
            index:-1,
            tabIndex:-1,
            oindex:-1,
            parentData:null,
            elemData:null,
            time:''  // 临时时间
        },
        fontSize:16
    },
    mutations:{
        init:(state,pagesData) => {
            state.pages = pagesData
        },
        create:(state) => {
            state.pages = [
                JSON.parse(JSON.stringify(state.defaultPage))
            ]
        },
        addPage:(state,index) => {
            if(index == state.pages.length - 1){
                state.pages.push(JSON.parse(JSON.stringify(state.defaultPage)))
            }else{
                state.pages.splice(index+1,0,JSON.parse(JSON.stringify(state.defaultPage)))
            }
        },
        addElement:(state,payload) => {
            state.pages[state.currentPage].elements.push(payload)
        },
        addComplexElement:(state,payload) => {
            store.commit('getData')
            state.data.elemData
                .props.base.tabs[payload.index].elements
                .push(payload.elemData)
        },
        setFontSize:(state,fontSize) => {
            state.fontSize = fontSize
        },
        removePage:(state,index) => {
            state.pages.splice(index,1);
        },
        setCurrentPage:(state,index) => {
            state.currentPage = index
        },
        setPageData:(state,payload) => {
            state.pages[state.currentPage][payload.parent][payload.stylename] = payload.value
        },
        reinitData:(state) => {
            state.data.parent = null
            state.data.pageIndex = -1
            state.data.index = -1
            state.data.tabIndex = -1
            state.data.elemData = null
        },
        getParent:(state,payload) => {
            let index = 0,
                parent = payload.elem.parentNode

            state.data[payload.name] = null
            while(parent){
                if(payload.type == 'attributes'){
                    if(parent.attributes[payload.value]){
                        state.data[payload.name] = parent
                        break
                    }
                }else{
                    if(new RegExp('('+payload.value+')','ig').test(parent.className)){
                        state.data[payload.name] = parent
                        break
                    }
                }
            }
        },
        getChild:(state,payload) => {
            let index = 0,
                children = payload.elem.children

            state.data[payload.name] = null
            for(let i = 0; i < children.length; i++){
                if(payload.type == 'attributes'){
                    if(children[i].attributes[payload.value]){
                        state.data[payload.name] = children[i]
                        break
                    }
                }else{
                    if(new RegExp('('+payload.value+')','ig').test(children[i].className)){
                        state.data[payload.name] = children[i]
                        break
                    }
                }
            }
        },
        getIndex:(state,payload) => {
            let index = 0,
                children = payload.elem.parentNode.children

            for(let i = 0; i < children.length; i++){
                if(children[i] == payload.elem){
                    index = i;
                    state.data[payload.name] = i
                    break;
                }
            }
        },
        getElemInfo:(state,elem) => {
            let parent = elem.parentNode,
                tab = [],
                children = [],
                oelem = null,
                i = 0,
                j = 0
            state.data.parent = null
            while(parent){
                if(/(page)/g.test(parent.className)){
                    break
                }
                if(parent.attributes['yh-tab']){
                    tab.push(parent)
                }
                parent = parent.parentNode
            }
            if(parent){
                state.data.parent = parent
                store.commit('getIndex',{
                    elem:parent,
                    name:'pageIndex'
                })
            }
            store.commit('getIndex',{
                elem:elem,
                name:'index'
            })
            if(tab.length > 0){
                for(i = tab.length - 1; i > -1; i--){
                    oelem = tab[i]
                    store.commit('getIndex',{
                        elem:oelem,
                        name:'tabIndex'
                    })
                    store.commit('getChild',{  // 获取当前elem的[yh-tab-content]
                        elem:oelem.children[0],
                        type:'attributes',
                        value:'yh-tab-content',
                        name:'ochild'
                    })
                    store.commit('getChild',{  // 获取当前elem的[yh-tab-content]
                        elem:state.data.ochild,
                        type:'classname',
                        value:'yh-tab-active',
                        name:'ochild'
                    })
                    store.commit('getIndex',{
                        elem:state.data.ochild,
                        name:'oindex'
                    })
                    if(i == tab.length - 1){
                        state.data.parentData = state.pages[state.data.pageIndex]
                                              .elements[state.data.tabIndex]
                                              .props.base.tabs[state.data.oindex].elements   // 当前的tab的所有elements
                    }else{
                        state.data.parentData = state.data.parentData[state.data.tabIndex]
                                              .props.base.tabs[state.data.oindex].elements  // tab 下的tab
                    }
                }
                state.data.elemData = state.data.parentData[state.data.index]
            }else{
                state.data.parentData = state.pages[state.data.pageIndex]
                                      .elements
                state.data.elemData = state.data.parentData[state.data.index]             
            }
        },
        getData:() => {
            let elem = document.getElementsByClassName('setting')[0],
                elemID = elem.id
            store.commit('getElemInfo',elem)
        },
        setValue:(state,payload) => {
            store.commit('getData')
            if(!payload.parent){
                state.data.elemData.props[payload.stylename] = payload.actualValue
            }else if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                state.data.elemData.props[payload.parent][payload.stylename] = payload.actualValue
            }else{
                state.data.elemData.props[payload.parent][payload.index][payload.stylename] = payload.actualValue
            }
            store.commit('reinitData')
        },
        setTabValue:(state,payload) => {
            store.commit('getData')
            let status = payload.index == -1 || payload.index == undefined
            if(status){
                if(payload.parent){
                    state.data.elemData.props[payload.parent][payload.stylename] = payload.actualValue
                }else{
                    state.data.elemData.props[payload.stylename] = payload.actualValue
                }
            }else{
                state.data.elemData.props.base.tabs[payload.index][payload.stylename] = payload.actualValue
            }
            store.commit('reinitData')
        },
        /**************
         * payload:数组，数组成员如下
         * parent: 当前style所在父级
         * stylename: 当前需修改的style名字
         * actualValue: 实际用来赋值的值
         * designValue: (非必须)设计的值
         ***************/
        setMultipleValue:(state,payload) => {
            store.commit('getData')
            let i = 0
            for(i = 0; i < payload.length; i++){
                switch(payload[i].parent){
                    case 'states':
                        if(!state.data.elemData.props[payload[i].parent]){
                            state.data.elemData.props[payload[i].parent] = {}
                        }
                        state.data.elemData.props[payload[i].parent][payload[i].index][payload[i].stylename] = payload[i].actualValue
                        break
                    case 'style':
                    case 'position':
                        if(!state.data.elemData.props[payload[i].parent]){
                            state.data.elemData.props[payload[i].parent] = {}
                        }
                        state.data.elemData.props[payload[i].parent][payload[i].stylename] = payload[i].actualValue
                        break
                    default:
                        state.data.elemData.props[payload[i].stylename] = payload[i].actualValue
                        break
                }
            }
            store.commit('reinitData')
        },
        addElementStates:(state,payload) => {
            store.commit('getData')
            let i = 0,
                data = ['box-shadow','box-shadow-x','box-shadow-y',
                        'box-shadow-blur','box-shadow-color',
                        'color','background-color','image'],
                one = {}
            if(!state.data.elemData.props.states){
                state.data.elemData.props.states = [];
            }
            for(i = 0; i < data.length; i++){
                if(state.data.elemData.props.style[data[i]]){
                    one[data[i]] = state.data.elemData.props.style[data[i]]
                }else{
                    switch(data[i]){
                        case 'box-shadow-x':
                        case 'box-shadow-y':
                        case 'box-shadow-blur':
                            one[data[i]] = 0
                            break
                        case 'box-shadow':
                            one[data[i]] = 'none'
                            break
                        case 'box-shadow-color':
                        case 'color':
                        case 'background-color':
                            one[data[i]] = 'transparent'
                            break
                        case 'image':
                            one[data[i]] = ''
                            break
                    }
                }
            }
            one.type = payload.type
            switch(payload.mold){
                case 'src':
                    one['yh-src'] = ''
                    break
                case 'bg':
                    one['background-image'] = ''
                    break
            }
            switch(payload.type){
                case 'active':
                    one['yh-number'] = '1'
                    break
                case 'invalid':
                    let now = new Date(),
                        future = new Date()
                    future.setDate(future.getDate()+30)
                    store.commit('timeFormat',{
                        now:now,
                        format:'yyyy/MM/dd hh:mm:ss'
                    })
                    one['yh-valid-start'] = state.data.time
                    store.commit('timeFormat',{
                        now:future,
                        format:'yyyy/MM/dd hh:mm:ss'
                    })
                    one['yh-valid-end'] = state.data.time
                    one['yh-valid-type'] = 'stylechange'
                    break
            }
            state.data.elemData.props.states.push(one)
            store.commit('reinitData')
        },
        removeElementState:(state,index) => {
            store.commit('getData')
            state.data.elemData.props.states.splice(index,1)
            store.commit('reinitData')
        },
        removeTab:(state,index) => {
            store.commit('getData')
            state.data.elemData.props.base.tabs.splice(index,1)
            store.commit('reinitData')
        },
        addTab:(state,payload) => {
            store.commit('getData')
            state.data.elemData.props.base.tabs.push(payload)
            store.commit('reinitData')
        },
        timeFormat:(state,payload) => {
            let o = {
                'y+':payload.now.getFullYear(),
                'M+':payload.now.getMonth() + 1,
                'd+':payload.now.getDate(),
                'h+':payload.now.getHours(),
                'm+':payload.now.getMinutes() + 1,
                's+':payload.now.getSeconds()
            }
            if(/(y+)/i.test(payload.format)) { 
                payload.format = payload.format.replace(RegExp.$1, (o['y+']+"").substr(4 - RegExp.$1.length));
            }
            for(var k in o) { 
                if(new RegExp("("+ k +")").test(payload.format)) { 
                    payload.format = payload.format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
                } 
            }
            state.data.time = payload.format
        },
        removeElement:(state,elemID) => {
            store.commit('getData')
            state.data.parentData.splice(state.data.index,1)
            store.commit('reinitData')
        }
    },
    actions:{
        
    },
    getters:{
        getPages:state => state.pages
    }
})



export default store