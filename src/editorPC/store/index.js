import Vue from 'vue'
import Vuex from 'vuex'
import {
    deepCopy
} from '../components/Base/Node.js'
import CUSTOM from './custom.js'

Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        customStatus:false,
        currentPage:0,
        pages:[],
        elements:[],
        includes:[],
        count:0,
        ENV_STATUS:__isProd__,
        host:__isProd__ ? 'http://topic.lagou.com/v3/' : 'http://localhost:9000/v3/',  // https://activity.lagou.com/topic/v3/
        connhost:__isProd__ ? 'http://topic.lagou.com/' : 'http://localhost:9000/',
        topic:window.location.host == 'topic.lagou.com' ? 'http://topic.lagou.com/' : 'http://localhost:9000/',
        // uploadFile:__isProd__ ? 'http://topic.lagou.com/file/upload' : 'http://localhost:9000/v3/api/editorPC/upload',
        fileHost:__isProd__ ? 'https://www.lgstatic.com/' : 'http://localhost:9000/v3/',
        // companyHost:__isProd__ ? 'http://topic.lagou.com/company/speed_checkCompany/' : 'http://localhost:9000/v3/api/editorPC/company/speed_checkCompany/',
        // positionHost:__isProd__ ? 'http://topic.lagou.com/job/speed_checkPosition/' : 'http://localhost:9000/v3/api/editorPC/job/speed_checkPosition/',        
        triggerId:'',
        triggerClassify:'',
        childClassify:'',
        parentmodule:'',
        yh_custom:[],   // 自定义组件
        yh_custom_status:'',
        ajaxUrl:{
            CompanyPositions:{
                // http://topic.lagou.com/company/getCompanyandPosition
                url:__isProd__ ? 'http://topic.lagou.com/v3/api/company/getCompanyandPosition_online' : 'http://localhost:9000/v3/api/company/getCompanyandPosition',
                type:'GET',
                param:'comAndPosi'
            },
            CompanyPosition:{
                // http://topic.lagou.com/company/speed_checkCompany/
                // http://localhost:9000/v3/api/company/speed_checkCompany/
                // http://topic.lagou.com/v3/api/company/speed_checkCompany-online/
                // http://local.lagou.com:8080/company/speed_checkCompany/
                url:__isProd__ ? 'http://topic.lagou.com/company/speed_checkCompany/' : 'http://local.lagou.com:8080/company/speed_checkCompany/',//'v3/api/company/speed_checkCompany/$id$',
                type:'POST'
            },
            Position:{
                // http://topic.lagou.com/job/speed_checkPosition/
                // http://localhost:9000/v3/api/job/speed_checkPosition/
                // http://topic.lagou.com/v3/api/job/speed_checkPosition_online/
                // http://local.lagou.com:8080/job/speed_checkPosition/
                url:__isProd__ ? 'http://topic.lagou.com/job/speed_checkPosition/' : 'http://local.lagou.com:8080/job/speed_checkPosition/',       // 'v3/api/job/speed_checkPosition/$id$',
                type:'GET'
            },
            File:{
                // online: http://topic.lagou.com/file/upload
                url:__isProd__ ? 'http://topic.lagou.com/v3/api/editorPC/upload_online' : 'http://localhost:9000/v3/api/editorPC/upload',
                type:'POST'
            },
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
        initCustom:(state,payload) => {
            state.yh_custom = payload.content
        },
        addCustom:(state,payload) => {
            state.yh_custom.push(payload.content)
        },
        setYHCustomStatus:(state,payload) => {
            state.yh_custom_status = payload.content
        },
        clearPage:(state) => {
            state.elements = []
        },
        changeCount:(state) => {
            state.count++
        },
        setCustomStatus:(state) => {
            state.customStatus  = !state.customStatus
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
            let i = 0,j = 0,
                length = state.elements.length,
                yh_module = '',
                arr = []
            if(!(payload instanceof Array)){
                arr = [payload]
            }else{
                arr = payload
            }
            for(i = 0; i < arr.length; i++){
                yh_module = arr[i]['yh-module']
                arr[i].path = arr[i].path.replace(/(index)/g,length+i)
                switch(yh_module){
                    case 'Slider_style1':
                    case 'Block_style2':
                    case 'Block_style3':
                    case 'Block_style4':
                    case 'Row_style1':
                        for(j = 0; j < arr[i].props.elements.length; j++){
                            if(!arr[i].props.elements[j].parentPath){
                                arr[i].props.elements[j].parentPath = arr[i].path
                                arr[i].props.elements[j].path = arr[i].path + '.'+arr[i].props.elements[j].path
                            }
                        }
                        break
                }
            }
            state.elements = state.elements.concat(arr)
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
            let i = 0, j = 0,
                elemData = state,
                parentData = state,
                parentPath = payload instanceof Array ? payload[0].parentPath : payload.parentPath,
                path = payload instanceof Array ? payload[0].path : payload.path,
                parentPathArr = parentPath.split(/[.]/g),
                pathArr = path.split(/[.]/g),
                value = '',
                status = false,
                length = 0,
                arr = [],
                yh_module = ''
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
            if(!(payload instanceof Array)){
                arr = [payload]
            }else{
                arr = payload
            }
            for(i = 0; i < arr.length; i++){
                yh_module = arr[i]['yh-module']
                arr[i].props.ischild = 'ischild'
                arr[i].path = parentPath+'.'+arr[i].path.replace(/(cindex)/g,length+i)
                if(length > 0){
                    switch(arr[0].parentmodule){
                        case 'List_style1':
                        case 'Slider_style1':
                            arr[i].props.css = deepCopy(arr[i].props.css,elemData[0].props.css)
                            arr[i].props.h5css = deepCopy(arr[i].props.h5css,elemData[0].props.h5css)
                            break
                    }
                }
                switch(yh_module){
                    case 'Slider_style1':
                    case 'Block_style2':
                    case 'Block_style3':
                    case 'Block_style4':
                    case 'Row_style1':
                        for(j = 0; j < arr[i].props.elements.length; j++){
                            if(!arr[i].props.elements[j].parentPath){
                                arr[i].props.elements[j].parentPath = arr[i].path
                                arr[i].props.elements[j].path = arr[i].path + '.'+arr[i].props.elements[j].path
                            }
                        }
                        break
                }
            }
            if(parentData.props.data.childmodule){
                parentData.props.data.childmodule.value = arr[0]['yh-module']
            }
            elemData = elemData.concat(arr)
            parentData.props.elements = elemData
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
        addElementStates:(state,payload) => {
            store.commit('getData')
            let i = 0,
                data = ['box-shadow','box-shadow-x','box-shadow-y',
                        'box-shadow-blur','box-shadow-color',
                        'color','background-color','image'],
                one = {}
            console.log(payload)
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
        /*****
         * setCompanyData: 拿到一个公司的数据，修改页面组件的数据
         * parent： 组件的数据父级，通常是data
         * eindex： 组件在整个页面所在的索引值
         * index： 组件在数据数组中的索引值
         * ischildset： 当前是否子组件的设置
         * path： 被设置的组件的路径
         * result： 公司的数据
         */
        setCompanyData:(state,payload) => {
            let i = 0,
                path = payload.path.split(/[.]/g),
                elemData = state,
                value = '',
                result = payload.result,
                data = {}
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
                    data = elemData.props.elements[payload.eindex].props
                    parent = payload.parent.split(/[.]/g)
                    for(i = 0 ; i < parent.length; i++){
                        if(parent[i].trim()){
                            data = data[parent[i]]
                        }
                    }
                    if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                        for(i in result){
                            if(data.hasOwnProperty(i)){
                                data[i].value = result[i]
                            }
                        }
                    }else{
                        for(i in result){
                            if(data[payload.index].hasOwnProperty(i)){
                                data[payload.index][i].value = result[i]
                            }
                        }
                    }
                    break
                default:
                    if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                        data = elemData.props
                        parent = payload.parent.split(/[.]/g)
                        for(i = 0 ; i < parent.length; i++){
                            if(parent[i].trim()){
                                data = data[parent[i]]
                            }
                        }
                        for(i in result){
                            if(data.hasOwnProperty(i)){
                                data[i].value = result[i]
                            }
                        }
                    }else{
                        data = elemData.props
                        parent = payload.parent.split(/[.]/g)
                        for(i = 0 ; i < parent.length; i++){
                            if(parent[i].trim()){
                                data = data[parent[i]]
                            }
                        }
                        for(i in result){
                            if(data[payload.index].hasOwnProperty(i)){
                                data[payload.index][i].value = result[i]
                            }
                        }
                    }
                    break
            }
        },
        setPositionData:(state,payload) => {
            let positionTag = {
                    '技术':'technique',
                    '产品':'product',
                    '设计':'design',
                    '运营':'operation',
                    '市场与销售':'market-sale',
                    '职能':'function',
                    '金融':'finance'
                },
                positionTag2 = {
                    'technique':'技术',
                    'product':'产品',
                    'design':'设计',
                    'operation':'运营',
                    'market-sale':'市场与销售',
                    'function':'职能',
                    'finance':'金融'
                },
                i = 0,
                path = payload.path.split(/[.]/g),
                elemData = state,
                value = '',
                result = payload.result,
                data = null
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
                    data = elemData.props.elements[payload.eindex].props
                    parent = payload.parent.split(/[.]/g)
                    for(i = 0 ; i < parent.length; i++){
                        if(parent[i].trim()){
                            data = data[parent[i]]
                        }
                    }
                    if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                        for(i in result){
                            if(data.hasOwnProperty(i)){
                                data[i].value = result[i]
                            }else if(i == 'positionFirstType' && result[i]){  // 职位类别
                                data['dynamic_type'].value = positionTag[result[i].split('/')[0].trim()]
                            }
                        }
                    }else{
                        for(i in result){
                            if(data[payload.index].hasOwnProperty(i)){
                                data[payload.index][i].value = result[i]
                            }else if(i == 'positionFirstType' && result[i]){  // 职位类别
                                data[payload.index]['dynamic_type'].value = positionTag[result[i].split('/')[0].trim()]
                            }
                        }
                    }
                    break
                default:
                    if(payload.index == -1 || payload.index == undefined || typeof payload.index == 'string'){
                        data = elemData.props
                        parent = payload.parent.split(/[.]/g)
                        for(i = 0 ; i < parent.length; i++){
                            if(parent[i].trim()){
                                data = data[parent[i]]
                            }
                        }
                        for(i in result){
                            if(data.hasOwnProperty(i)){
                                data[i].value = result[i]
                            }else if(i == 'positionFirstType' && result[i]){  // 职位类别
                                data['dynamic_type'].value = positionTag[result[i].split('/')[0].trim()]
                            }
                        }
                    }else{
                        data = elemData.props
                        parent = payload.parent.split(/[.]/g)
                        for(i = 0 ; i < parent.length; i++){
                            if(parent[i].trim()){
                                data = data[parent[i]]
                            }
                        }
                        for(i in result){
                            if(data[payload.index].hasOwnProperty(i)){
                                data[payload.index][i].value = result[i]
                            }else if(i == 'positionFirstType' && result[i]){  // 职位类别
                                data[payload.index]['dynamic_type'].value = positionTag[result[i].split('/')[0].trim()]
                            }
                        }
                    }
                    break
            }
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
            // elemData[last] = null
            elemData.splice(last,1,null)
            // elemData.splice(last,1)
        }
    },
    actions:{
        
    },
    getters:{
        getPages:state => state.pages
    },
    modules:{
        custom:CUSTOM
    }
})



export default store