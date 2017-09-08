import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store = new Vuex.Store({
    state:{
        host:__isProd__ ? 'http://topic.lagou.com/v3/' : 'http://localhost:9000/v3/',  // https://activity.lagou.com/topic/v3/
        connhost:__isProd__ ? 'http://topic.lagou.com/' : 'http://localhost:9000/',
        currentPage:0,
        pages:[{
            status:true
        }],
        elements:[  // 二维数组
            []
        ],
        includes:[],
        eventList:[],
        data:{
            path:'',
            elemData:null
        },
        count:0,
        fontSize:16,
    },
    mutations:{
        setFontSize:(state,fontSize) => {
            state.fontSize = fontSize
        },
        init:(state,pagesData) => {
            state.pages = pagesData
        },
        initElements:(state,payload) => {
            state.elements = payload
        },
        initData:(state,payload) => {
            for(let attr in payload){
                state[attr] = payload[attr]
            }
        },
        changeCount:(state) => {
            state.count++
        },
        setCurrentPage:(state,index) => {
            state.currentPage = index
        },
        changePageStatus:(state,payload) => {
            state.pages[payload.oldv].status = false
            state.pages[payload.newv].status = true
        },
        changePageEnterStatus:(state,index) => {
            state.pages[index].status = true
        },
        changePageLeaveStatus:(state,index) => {
            state.pages[index].status = false
        },
        // parent:'background',
        // stylename:name,
        // value:color
        setPageData:(state,payload) => {

        },
        addElement:(state,payload) => {
            // state.pages[state.currentPage].elements.push(payload)
            let length = state.elements[state.currentPage].length
            payload.path = payload.path.replace('index',length)
            state.elements[state.currentPage].push(payload)
        },
        addComplexElement:(state,payload) => {
            store.commit('getData')
            state.data.elemData
                .props.base.tabs[payload.index].elements
                .push(payload.elemData)
        },
        removeElement:(state,payload) => {
            // store.commit('getData')
            let elemData = state,
                path = payload.path.split(/[.]/g),
                i = 0,
                value = '',
                last = path[path.length-1]
            if(/[0-9]/g.test(last)){
                last = parseInt(last)
            }else{
                last = -1;
            }
            for(i = 0; i < path.length - 1; i++){
                value = path[i]
                if(value){
                    if(/[0-9]/g.test(path[i])){
                        value = parseInt(path[i])
                    }
                    elemData = elemData[value]
                }
            }
            elemData.splice(last,1)
        },
        addEventList:(state,name) => {
            if(state.eventList.indexOf(name) == -1){
                state.eventList.push(name)
            }
        },
        setConditionStatus:(state,data) => {
            if(data.child.effect){  //effect
                let j = 0,t = 0,
                    temp = null,
                    arr = [],
                    status = false,
                    dataPath = '',
                    condition = '',
                    pathArray = [],
                    current = null
                for(j = 0; j < data.child.effect.length; j++){
                    // temp 表示会被影响的元素
                    // current 表示当前元素即data.child
                    temp = data.parent
                    current = data.parent
                    arr = data.child.effect[j].split(/[.]/g)
                    for(t = 0; t < arr.length; t++){
                        if(arr[t]){
                            temp = temp[arr[t]]
                        }
                    }
                    temp.status = false
                    switch(temp.limitop){
                        case "!=":
                            for(t = 0; t < temp.condition.length; t++){
                                if(data.child.value == temp.condition[t]){
                                    temp.status = false
                                    break
                                }else{
                                    temp.status = true
                                }
                            }
                            break
                        case ">":
                            if(data.child.value > temp.condition[0]){
                                temp.status = true
                                break
                            }
                            break
                        case "<":
                            if(data.child.value < temp.condition[0]){
                                temp.status = true
                                break
                            }
                            break
                        case ">=":
                            if(data.child.value >= temp.condition[0]){
                                temp.status = true
                                break
                            }
                            break
                        case "<=":
                            if(data.child.value <= temp.condition[0]){
                                temp.status = true
                                break
                            }
                            break
                        case "==":
                        default:
                            for(t = 0; t < temp.condition.length; t++){
                                if(data.child.value == temp.condition[t]){
                                    temp.status = true
                                    break
                                }
                            }
                            break
                    }
                    // for(t = 0; t < temp.condition.length; t++){
                    //     if(data.child.value == temp.condition[t]){
                    //         temp.status = true
                    //         break
                    //     }
                    // }
                    // status = /(!=)/g.test(temp.condition)
                    // arr = status ? temp.condition.split(/(!=)/g) : temp.condition.split(/(==)/g)
                    // dataPath = arr[0].trim()
                    // condition = arr[2].trim().replace(/"/g,'')
                    // if(status && data.child.value != condition){
                    //     temp.status = true
                    // }else if(!status && data.child.value == condition){
                    //     temp.status = true
                    // }else {
                    //     temp.status = false
                    // }
                }
            }
        },
        /**************
         * payload:数组，数组成员如下
         * parent: 当前style所在父级
         * eindex: 如果当前是某个组件的子级（elements下的元素）
         *         则eindex表示当前在elements中的索引值
         *         否则为-1
         * index: 如果当前元素的某个属性值为Array，index则表示所在属性值的索引
         *        否则为-1
         * stylename: 当前需修改的style名字
         * actualValue: 实际用来赋值的值
         * designValue: (非必须)设计的值
         ***************/
        setValue:(state,payload) => {
            // ischildset // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            let i = 0,j = 0,t = 0,
                path = payload.path.split(/[.]/g),
                elemData = state,
                data = null,
                parent  = [],
                value = '',
                one = {},
                temp = {},
                arr = []
            if(state.data.path == payload.path && state.data.elemData){
                elemData = state.data.elemData
            }else{
                for(i = 0; i < path.length; i++){
                    value = path[i]
                    if(value){
                        if(/[0-9]/g.test(path[i])){
                            value = parseInt(path[i])
                        }
                        elemData = elemData[value]
                    }
                }
            }
            switch(payload.ischildset){
                case 'ischildset':
                    if(payload.parent == 'data' || payload.parent.indexOf('data.') == 0){ // 只针对单个组件
                        data = elemData.props.elements[payload.eindex].props
                        parent = payload.parent.split(/[.]/g)
                        for(i = 0 ; i < parent.length; i++){
                            if(parent[i].trim()){
                                data = data[parent[i]]
                            }
                        }
                        if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                            data[payload.stylename].value = payload.actualValue
                            if(payload.cnvalue){
                                data[payload.stylename].cnvalue = payload.cnvalue
                            }
                        }else{
                            data[payload.index][payload.stylename].value = payload.actualValue
                            if(payload.cnvalue){
                                data[payload.index][payload.stylename].cnvalue = payload.cnvalue
                            }
                        }
                    }else{
                        if(!payload.parent){
                            for(i = 0; i < elemData.props.elements.length; i++){
                                elemData.props.elements[i].props[payload.stylename].value = payload.actualValue
                                if(payload.cnvalue){
                                    elemData.props.elements[i].props[payload.stylename].cnvalue = payload.cnvalue
                                }
                                store.commit('setConditionStatus',{
                                    parent:elemData.props.elements[i].props,
                                    child:elemData.props.elements[i].props[payload.stylename]
                                })
                            }
                        }else if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                            if(elemData.props.sync){
                                for(i in elemData.props.sync){
                                    if(i == payload.stylename){
                                        for(j = 0; j < elemData.props.sync[i].length; j++){
                                            arr = elemData.props.sync[i][j].split('.')
                                            temp = elemData.props
                                            for(t = 0; t < arr.length; t++){
                                                temp = temp[arr[t]]
                                            }
                                            temp.value = payload.actualValue
                                        }
                                        break;
                                    }
                                }
                            }
                            for(i = 0; i < elemData.props.elements.length; i++){
                                data = elemData.props.elements[i].props
                                parent = payload.parent.split(/[.]/g)
                                for(j = 0 ; j < parent.length; j++){
                                    if(parent[j].trim()){
                                        data = data[parent[j]]
                                    }
                                }
                                // one = elemData.props.elements[i].props[payload.parent][payload.stylename]
                                one = data[payload.stylename]
                                one.value = payload.actualValue
                                if(payload.cnvalue){
                                    one.cnvalue = payload.cnvalue
                                }
                                store.commit('setConditionStatus',{
                                    parent:elemData.props.elements[i].props,
                                    child:one
                                })
                            }
                        }else{
                            for(i = 0; i < elemData.props.elements.length; i++){
                                data = elemData.props.elements[i].props
                                parent = payload.parent.split(/[.]/g)
                                for(j = 0 ; j < parent.length; j++){
                                    if(parent[j].trim()){
                                        data = data[parent[j]]
                                    }
                                }
                                // elemData.props.elements[i].props[payload.parent][payload.index][payload.stylename].value = payload.actualValue                                
                                data[payload.index][payload.stylename].value = payload.actualValue
                                if(payload.cnvalue){
                                    // elemData.props.elements[i].props[payload.parent][payload.index][payload.stylename].cnvalue = payload.cnvalue
                                    data[payload.index][payload.stylename].cnvalue = payload.cnvalue
                                }
                                store.commit('setConditionStatus',{
                                    parent:elemData.props.elements[i].props,
                                    child:data[payload.index]
                                    // child:elemData.props.elements[i].props[payload.parent][payload.index]
                                })
                            }
                        }
                    }
                    break
                default:
                    if(!payload.parent){
                        elemData.props[payload.stylename].value = payload.actualValue
                        if(payload.cnvalue){
                            elemData.props[payload.stylename].cnvalue = payload.cnvalue
                        }
                        store.commit('setConditionStatus',{
                            parent:elemData.props,
                            child:elemData.props[payload.stylename]
                        })
                    }else if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                        data = elemData.props
                        parent = payload.parent.split(/[.]/g)
                        for(j = 0 ; j < parent.length; j++){
                            if(parent[j].trim()){
                                data = data[parent[j]]
                            }
                        }
                        // elemData.props[payload.parent][payload.stylename].value = payload.actualValue
                        data[payload.stylename].value = payload.actualValue
                        if(payload.cnvalue){
                            // elemData.props[payload.parent][payload.stylename].cnvalue = payload.cnvalue
                            data[payload.stylename].cnvalue = payload.cnvalue
                        }
                        store.commit('setConditionStatus',{
                            parent:elemData.props,
                            child:data[payload.stylename]
                            // child:elemData.props[payload.parent][payload.stylename]
                        })
                    }else{
                        data = elemData.props
                        parent = payload.parent.split(/[.]/g)
                        for(i = 0 ; i < parent.length; i++){
                            if(parent[i].trim()){
                                data = data[parent[i]]
                            }
                        }
                        data[payload.index][payload.stylename].value = payload.actualValue
                        if(payload.cnvalue){
                            data[payload.index][payload.stylename].cnvalue = payload.cnvalue
                        }
                        store.commit('setConditionStatus',{
                            parent:elemData.props,
                            child:data[payload.index][payload.stylename]
                        })
                    }
                    break
            }
            state.data.path = payload.path
            state.data.elemData = elemData
            // store.commit('reinitData')
        },
        /**************
         * payload:数组，数组成员如下
         * parent: 当前style所在父级
         * eindex: 如果当前是某个组件的子级（elements下的元素）
         *         则eindex表示当前在elements中的索引值
         *         否则为-1
         * index: 如果当前元素的某个属性值为Array，index则表示所在属性值的索引
         *        否则为-1
         * stylename: 当前需修改的style名字
         * actualValue: 实际用来赋值的值
         * designValue: (非必须)设计的值
         ***************/
        setMultipleValue:(state,payload) => {
            // store.commit('getData')
            let i = 0,j = 0,t = 0,
                data = {},
                parent = [],
                path = payload.path.split(/[.]/g),
                elemData = state,
                value = '',
                one = {},
                temp = {},
                arr = []
            if(state.data.path == payload.path && state.data.elemData){
                elemData = state.data.elemData
            }else{
                for(i = 0; i < path.length; i++){
                    value = path[i]
                    if(value){
                        if(/[0-9]/g.test(path[i])){
                            value = parseInt(path[i])
                        }
                        elemData = elemData[value]
                    }
                }
            }
            switch(payload.ischildset){
                case 'ischildset':
                    for(i = 0; i < payload.list.length; i++){
                        if(payload.list[i].index == -1 || payload.list[i].index == undefined || typeof payload.list[i].index == 'string'){
                            for(j = 0; j < elemData.props.elements.length; j++){
                                data = elemData.props.elements[j].props
                                parent = payload.list[i].parent.split(/[.]/g)
                                for(t = 0 ; t < parent.length; t++){
                                    if(parent[t].trim()){
                                        data = data[parent[t]]
                                    }
                                }
                                // one = elemData.props.elements[j].props[payload.list[i].parent][payload.list[i].stylename]
                                one = data[payload.list[i].stylename]
                                one.value = payload.list[i].actualValue
                                if(payload.list[i].cnvalue){
                                    one.cnvalue = payload.list[i].cnvalue
                                }
                                store.commit('setConditionStatus',{
                                    parent:elemData.props.elements[j].props,
                                    child:one
                                })
                            }
                        }else{
                            for(j = 0; j < elemData.props.elements.length; j++){
                                data = elemData.props.elements[j].props
                                parent = payload.list[i].parent.split(/[.]/g)
                                for(t = 0 ; t < parent.length; t++){
                                    if(parent[t].trim()){
                                        data = data[parent[t]]
                                    }
                                }
                                // elemData.props.elements[j].props[payload.list[i].parent][payload.list[i].index][payload.list[i].stylename].value = payload.list[i].actualValue
                                data[payload.list[i].index][payload.list[i].stylename].value = payload.list[i].actualValue
                                if(payload.list[i].cnvalue){
                                    // elemData.props.elements[j].props[payload.list[i].parent][payload.list[i].index][payload.list[i].stylename].cnvalue = payload.list[i].cnvalue
                                    data[payload.list[i].index][payload.list[i].stylename].cnvalue = payload.list[i].cnvalue
                                }
                                store.commit('setConditionStatus',{
                                    parent:elemData.props.elements[j].props,
                                    child:data[payload.list[i].index][payload.list[i].stylename]
                                    // child:elemData.props.elements[j].props[payload.list[i].parent][payload.list[i].index][payload.list[i].stylename]
                                })
                            }
                        }
                    }
                    break
                default:
                    for(i = 0; i < payload.list.length; i++){
                        if(!payload.list[i].parent){
                            elemData.props[payload.list[i].stylename].value = payload.list[i].actualValue
                            if(payload.list[i].cnvalue){
                                elemData.props[payload.list[i].stylename].cnvalue = payload.list[i].cnvalue
                            }
                            store.commit('setConditionStatus',{
                                parent:elemData.props,
                                child:elemData.props[payload.list[i].stylename]
                            })
                        }else if(payload.list[i].index == -1 || payload.list[i].index == undefined || typeof payload.list[i].index == 'string'){
                            data = elemData.props
                            parent = payload.list[i].parent.split(/[.]/g)
                            for(t = 0 ; t < parent.length; t++){
                                if(parent[t].trim()){
                                    data = data[parent[t]]
                                }
                            }
                            // elemData.props[payload.list[i].parent][payload.list[i].stylename].value = payload.list[i].actualValue
                            data[payload.list[i].stylename].value = payload.list[i].actualValue
                            if(payload.list[i].cnvalue){
                                // elemData.props[payload.list[i].parent][payload.list[i].stylename].cnvalue = payload.list[i].cnvalue
                                data[payload.list[i].stylename].cnvalue = payload.list[i].cnvalue
                            }
                            store.commit('setConditionStatus',{
                                parent:elemData.props,
                                child:data[payload.list[i].stylename]
                                // child:elemData.props[payload.list[i].parent][payload.list[i].stylename]
                            })
                        }else{
                            data = elemData.props
                            parent = payload.list[i].parent.split(/[.]/g)
                            for(i = 0 ; i < parent.length; i++){
                                if(parent[i].trim()){
                                    data = data[parent[i]]
                                }
                            }
                            data[payload.list[i].index][payload.list[i].stylename].value = payload.list[i].actualValue
                            if(payload.list[i].cnvalue){
                                data[payload.list[i].index][payload.list[i].stylename].cnvalue = payload.list[i].cnvalue
                            }
                            store.commit('setConditionStatus',{
                                parent:elemData.props,
                                child:data[payload.list[i].index][payload.list[i].stylename]
                            })
                        }
                    }
                    break
            }
            state.data.path = payload.path
            state.data.elemData = elemData
            // store.commit('reinitData')
        },
    }
})



export default store