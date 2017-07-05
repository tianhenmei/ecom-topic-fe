import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        currentPage:0,
        pages:[],
        elements:[],
        includes:[],
        count:0,
        host:'http://localhost:9000/',
        topic:window.location.host == 'topic.lagou.com' ? 'http://topic.lagou.com/' : 'http://localhost:9000/',
        triggerId:'',
        triggerClassify:'',
        childClassify:'',
        ajaxUrl:{
            CompanyPositions:{
                url:'company/getCompanyandPosition',
                type:'GET',
                param:'comAndPosi'
            },
            CompanyPosition:{
                url:'company/speed_checkCompany/$id$',
                type:'POST'
            },
            Position:{
                url:'job/speed_checkPosition/$id$',
                type:'GET'
            }
        },
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
        selected:{
            id:'',
            elem:null,   // jquery 对象
            yh_module:''
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
            time:'',  // 临时时间
            path:''
        },
        fontSize:16
    },
    mutations:{
        init:(state,pagesData) => {
            state.pages = pagesData
        },
        initData:(state,data) => {
            for(let attr in data){
                state[attr] = data[attr]
            }
        },
        changeCount:(state) => {
            state.count++
        },
        create:(state) => {
            state.pages = [
                JSON.parse(JSON.stringify(state.defaultPage))
            ]
        },
        initSelected:(state) => {
            state.selected.id = ''
            state.selected.elem = null
            state.selected.yh_module = ''
        },
        setSelected:(state,payload) => {

        },
        addPage:(state,index) => {
            if(index == state.pages.length - 1){
                state.pages.push(JSON.parse(JSON.stringify(state.defaultPage)))
            }else{
                state.pages.splice(index+1,0,JSON.parse(JSON.stringify(state.defaultPage)))
            }
        },
        addElement:(state,payload) => {
            let i = 0,
                length = state.elements.length  
            if(payload instanceof Array){
                for(i = 0; i < payload.length; i++){
                    payload[i].path = payload[i].path.replace(/(index)/g,length+i)
                }
                state.elements = state.elements.concat(payload)
            }else{
                payload.path = payload.path.replace(/(index)/g,length)
                state.elements.push(payload)
            }
        },
        addChildData:(state,payload) => {
            // store.commit('getData',state.triggerId)
            let i = 0,j = '',
                length = state.data.elemData.props.elements.length
            for(i = 0; i < payload.length; i++){
                if(length > 0){
                    for(j in payload[i].props){
                        switch(j){
                            case 'data':
                            case 'id':
                                break
                            default:
                                payload[i].props[j] = state.data.elemData.props.elements[0].props[j]
                                break
                        }
                    }
                }
                payload[i].props.ischild = 'ischild'
                // payload[i].props.attribute.ischild.value = 'ischild'
            }
            state.data.elemData.props.elements = state.data.elemData.props.elements.concat(payload)
        },
        addChildElement:(state,payload) => {
            // store.commit('getData')
            let i = 0,
                elemData = state,
                parentData = state,
                parentPath = payload instanceof Array ? payload[0].parentPath : payload.parentPath,
                path = payload instanceof Array ? payload[0].path : payload.path,
                parentPathArr = parentPath.split(/[.]/g),
                pathArr = path.split(/[.]/g),
                value = '',
                status = false,
                length = 0
            for(i = 0; i < parentPathArr.length; i++){
                value = parentPathArr[i]
                if(value){
                    if(/[0-9]/g.test(value)){
                        value = parseInt(value)
                    }
                    parentData = parentData[value]
                }
            }
            elemData = parentData 
            for(i = 0; i < pathArr.length; i++){
                value = pathArr[i]
                if(value){
                    if(/[0-9]/g.test(value)){
                        value = parseInt(value)
                    }
                    switch(value){
                        case 'cindex':
                            status = true
                            break
                        default:
                            elemData = elemData[value]
                            break
                    }
                }
                if(status){
                    break
                }
            }
            length = elemData.length
            if(payload instanceof Array){
                for(i = 0; i < payload.length; i++){
                    // payload[i].props.attribute.ischild.value = 'ischild'
                    payload[i].props.ischild = 'ischild'
                    payload[i].path = parentPath+'.'+payload[i].path.replace(/(cindex)/g,length+i)
                }
                parentData.props.data.childmodule.value = payload[0]['yh-module']
                elemData = elemData.concat(payload)
            }else{
                // payload.props.attribute.ischild.value = 'ischild'
                payload.props.ischild = 'ischild'
                payload.path = parentPath+'.'+payload.path.replace(/(cindex)/g,length)
                parentData.props.data.childmodule.value = payload['yh-module']
                elemData.push(payload)
            }
            parentData.props.elements = elemData
            // console.log(parentData)
        },
        addComplexElement:(state,payload) => {
            store.commit('getData')
            state.data.elemData
                .props.base.tabs[payload.index].elements
                .push(payload.elemData)
        },
        setTriggerID:(state,payload) => {
            for(let s in payload){
                state[s] = payload[s]
            }
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
                shells = [],
                children = [],
                oelem = null,
                i = 0,
                j = 0
            state.data.parent = null
            while(parent){
                if(parent.attributes['yh-editor-content']){
                    break
                }
                if(parent.attributes['yh-vessel']){
                    shells.push(parent)
                }
                parent = parent.parentNode
            }
            store.commit('getIndex',{
                elem:elem,
                name:'index'
            })
            if(shells.length > 0){
                for(i = shells.length - 1; i > -1; i--){
                    oelem = shells[i]
                    store.commit('getIndex',{
                        elem:oelem,
                        name:'oIndex'
                    })
                    if(i == shells.length - 1){
                        state.data.parentData = state.elements[state.data.oIndex].props.elements 
                    }else{
                        state.data.parentData = state.data.parentData[state.data.oIndex].props.elements 
                    }
                    // store.commit('getIndex',{
                    //     elem:oelem,
                    //     name:'tabIndex'
                    // })
                    // store.commit('getChild',{  // 获取当前elem的[yh-tab-content]
                    //     elem:oelem.children[0],
                    //     type:'attributes',
                    //     value:'yh-tab-content',
                    //     name:'ochild'
                    // })
                    // store.commit('getChild',{  // 获取当前elem的[yh-tab-content]
                    //     elem:state.data.ochild,
                    //     type:'classname',
                    //     value:'yh-tab-active',
                    //     name:'ochild'
                    // })
                    // store.commit('getIndex',{
                    //     elem:state.data.ochild,
                    //     name:'oindex'
                    // })
                    // if(i == shells.length - 1){
                    //     state.data.parentData = state.elements[state.data.tabIndex]
                    //                           .props.children[state.data.oindex].elements   // 当前的tab的所有elements
                    // }else{
                    //     state.data.parentData = state.data.parentData[state.data.tabIndex]
                    //                           .props.children[state.data.oindex].elements  // tab 下的tab
                    // }
                }
                state.data.elemData = state.data.parentData[state.data.index]
            }else{
                state.data.parentData = state.elements
                state.data.elemData = state.data.parentData[state.data.index]             
            }
        },
        getData:(state,elemID = '') => {
            let elem = null
            if(elemID){
                elem = document.getElementById(elemID)
                if(!/(setting)/g.test(elem.className)){
                    elem.className += ' setting'
                }
            }else{
                elem = document.getElementsByClassName('setting')[0]
                elemID = elem.id
            }
            store.commit('getElemInfo',elem)
        },
        setValue:(state,payload) => {
            // ischildset // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            let i = 0,
                path = payload.path.split(/[.]/g),
                elemData = state,
                value = ''
            if(state.data.path == payload.path){
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
                        let data = elemData.props.elements[payload.eindex].props,
                            parent = payload.parent.split(/[.]/g)
                        for(i = 0 ; i < parent.length; i++){
                            if(parent[i].trim()){
                                data = data[parent[i]]
                            }
                        }
                        if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                            data[payload.stylename].value = payload.actualValue
                        }else{
                            data[payload.index][payload.stylename].value = payload.actualValue
                        }
                    }else{
                        if(!payload.parent){
                            for(i = 0; i < elemData.props.elements.length; i++){
                                elemData.props.elements[i].props[payload.stylename] = payload.actualValue
                            }
                        }else if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                            for(i = 0; i < elemData.props.elements.length; i++){
                                elemData.props.elements[i].props[payload.parent][payload.stylename].value = payload.actualValue
                            }
                        }else{
                            for(i = 0; i < elemData.props.elements.length; i++){
                                elemData.props.elements[i].props[payload.parent][payload.index][payload.stylename].value = payload.actualValue
                            }
                        }
                    }
                    break
                default:
                    if(!payload.parent){
                        elemData.props[payload.stylename] = payload.actualValue
                    }else if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                        elemData.props[payload.parent][payload.stylename].value = payload.actualValue
                    }else{
                        let data = elemData.props,
                            parent = payload.parent.split(/[.]/g)
                        for(i = 0 ; i < parent.length; i++){
                            if(parent[i].trim()){
                                data = data[parent[i]]
                            }
                        }
                        data[payload.index][payload.stylename].value = payload.actualValue
                    }
                    break
            }
            state.data.path = payload.path
            state.data.elemData = elemData
            // store.commit('reinitData')
        },
        // setValue:(state,payload) => {
        //     // ischildset // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
        //     let i = 0
        //     store.commit('getData')
        //     switch(payload.ischildset){
        //         case 'ischildset':
        //             if(payload.parent == 'data' || payload.parent.indexOf('data.') == 0){ // 只针对单个组件
        //                 let data = state.data.elemData.props.elements[payload.eindex].props,
        //                     parent = payload.parent.split(/[.]/g)
        //                 for(i = 0 ; i < parent.length; i++){
        //                     if(parent[i].trim()){
        //                         data = data[parent[i]]
        //                     }
        //                 }
        //                 if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
        //                     data[payload.stylename].value = payload.actualValue
        //                 }else{
        //                     data[payload.index][payload.stylename].value = payload.actualValue
        //                 }
        //             }else{
        //                 if(!payload.parent){
        //                     for(i = 0; i < state.data.elemData.props.elements.length; i++){
        //                         state.data.elemData.props.elements[i].props[payload.stylename] = payload.actualValue
        //                     }
        //                 }else if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
        //                     for(i = 0; i < state.data.elemData.props.elements.length; i++){
        //                         state.data.elemData.props.elements[i].props[payload.parent][payload.stylename].value = payload.actualValue
        //                     }
        //                 }else{
        //                     for(i = 0; i < state.data.elemData.props.elements.length; i++){
        //                         state.data.elemData.props.elements[i].props[payload.parent][payload.index][payload.stylename].value = payload.actualValue
        //                     }
        //                 }
        //             }
        //             break
        //         default:
        //             if(!payload.parent){
        //                 state.data.elemData.props[payload.stylename] = payload.actualValue
        //             }else if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
        //                 state.data.elemData.props[payload.parent][payload.stylename].value = payload.actualValue
        //             }else{
        //                 let data = state.data.elemData.props,
        //                     parent = payload.parent.split(/[.]/g)
        //                 for(i = 0 ; i < parent.length; i++){
        //                     if(parent[i].trim()){
        //                         data = data[parent[i]]
        //                     }
        //                 }
        //                 data[payload.index][payload.stylename].value = payload.actualValue
        //             }
        //             break
        //     }
        //     store.commit('reinitData')
        // },
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
            let i = 0,j = 0
            switch(payload.ischildset){
                case 'ischildset':
                    for(i = 0; i < payload.length; i++){
                        switch(payload[i].parent){
                            case 'nonset':
                            case 'css':
                                for(j = 0; j < state.data.elemData.props.elements.length; j++){
                                    state.data.elemData.props.elements[j].props[payload[i].parent][payload[i].stylename].value = payload[i].actualValue
                                }
                                break;
                            case 'states':
                                for(j = 0; j < state.data.elemData.props.elements.length; j++){
                                    if(!state.data.elemData.props.elements[j].props[payload[i].parent]){
                                        state.data.elemData.props.elements[j].props[payload[i].parent] = {}
                                    }
                                    state.data.elemData.props.elements[j].props[payload[i].parent][payload[i].index][payload[i].stylename] = payload[i].actualValue
                                }
                                break
                            case 'style':
                            case 'position':
                                for(j = 0; j < state.data.elemData.props.elements.length; j++){
                                    if(!state.data.elemData.props.elements[j].props[payload[i].parent]){
                                        state.data.elemData.props.elements[j].props[payload[i].parent] = {}
                                    }
                                    state.data.elemData.props.elements[j].props[payload[i].parent][payload[i].stylename] = payload[i].actualValue
                                }
                                break
                            default:
                                for(j = 0; j < state.data.elemData.props.elements.length; j++){
                                    state.data.elemData.props.elements[j].props[payload[i].stylename] = payload[i].actualValue
                                }
                                break
                        }
                    }
                    break
                default:
                    for(i = 0; i < payload.length; i++){
                        switch(payload[i].parent){
                            case 'nonset':
                            case 'css':
                                state.data.elemData.props[payload[i].parent][payload[i].stylename].value = payload[i].actualValue
                                break;
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
                    break
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