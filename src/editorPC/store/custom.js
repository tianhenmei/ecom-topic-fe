var CUSTOM = {
    state:{
        id:'yh-custom',
        // sync : 只有当此组件为容器组件时才会有
        // 用来当容器组件的子组件的某个属性（必须是公共属性）改变时，当前容器组件的某个属性也要跟着改变
        // 可改变多个容器组件的属性，数组的形式
        // sync:{
        //     'background_width':['css.width']
        // }
        css:{
            // background: 类名  background_color: css样式background-color
            width:{
                cn:'宽度',
                en:'width',
                value:300,
                type:'number',
                parent:'css',
                //编辑类型：如果是自定义，则走自定义类型， 此值会影响设置函数，如：（其值的首字母会大写）
                // setValue -> setCustomValue
                // setMultipleValue -> setCustomMultipleValue
                edittype:'custom'   
            },
            height:{
                cn:'高度',
                en:'height',
                value:400,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            background_type:{
                cn:'背景类型',
                en:'background_type',
                value:'background-color',
                cnvalue:'纯背景色',
                type:'options',
                parent:'css',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'纯背景色',   // 选项中文
                    value:'background-color' // 选项真正的值
                },{  // 选项的类容
                    cn:'背景图',   // 选项中文
                    value:'background-image' // 选项真正的值
                },{
                    cn:'上下渐变',
                    value:'gradient-top-bottom'
                },{
                    cn:'左右渐变',
                    value:'gradient-left-right'
                }],
                effect:['css.background_color','css.background_image','css.background_repeat',
                    'css.gradient_color_top','css.gradient_color_bottom',
                    'css.gradient_color_left','css.gradient_color_right']
            },
            background_color:{
                cn:'背景颜色',
                en:'background_color',
                value:'#ffffff',
                type:'color',
                parent:'css',
                edittype:'custom',
                condition:['background-color','background-image'],
                status:true
            },
            background_image:{
                cn:'背景图',
                en:'background_image',
                value:'none',
                type:'image',
                mold:'bg',
                edittype:'custom' ,
                parent:'css',
                condition:['background-image'],
                status:false
            },
            background_repeat:{
                cn:'背景重复',
                en:'background_repeat',
                value:'no-repeat',
                cnvalue:'不重复',
                type:'options',
                edittype:'custom',
                options:[{
                    cn:'不重复',
                    value:'no-repeat'
                },{
                    cn:'重复',
                    value:'repeat'
                },{
                    cn:'横向重复',
                    value:'repeat-x'
                },{
                    cn:'纵向重复',
                    value:'repeat-y'
                }],
                parent:'css',
                condition:['background-image'],
                status:false
            },
            gradient_color_top:{
                cn:'背景-上',
                en:'gradient_color_top',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'css',
                condition:['gradient-top-bottom'],
                status:false
            },
            gradient_color_bottom:{
                cn:'背景-下',
                en:'gradient_color_bottom',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'css',
                condition:['gradient-top-bottom'],
                status:false
            },
            gradient_color_left:{
                cn:'背景-左',
                en:'gradient_color_left',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'css',
                condition:['gradient-left-right'],
                status:false
            },
            gradient_color_right:{
                cn:'背景-右',
                en:'gradient_color_right',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'css',
                condition:['gradient-left-right'],
                status:false
            },
            // background_color:{
            //     cn:'背景颜色',
            //     en:'background_color',
            //     value:'#ffffff',
            //     type:'color'  ,
            //     edittype:'custom'
            //         // color(默认)   
            //         // image（背景图(mold="bg")、图片(mold="src")）  
            //         // number(数字)     
            //         // text(文本)
            //         // textarea(多行文字)
            //         // uplist(内部多选项设置)
            //         // request （数据请求：公司ID、职位ID、问题ID、回答ID等）
            //         // options 选项
            //         // none  不编辑的属性
            //     // name:'子级属性名'  只有点击显示多个编辑的时候，如果子级是数组，每个数组元素是对象，则取此对象的属性等于name值的值作为uplist的title
            //     // condition:["auto",0]（条件）  通过带有effect属性的设置项查找，当其值等于"auto"或0时才会显示设置
            //     // status: false | true   条件控制的状态
            //     // effect:['',''] 当前属性会影响的属性，如css.overflow
            //     // default:'auto',  // 默认值
            //     // ivalue:100,   // 初始值
            //     // options:[{  // 选项的类容
            //         // cn:'',   ／／ 选项中文
            //         // value:'' // 选项真正的值
            //     // }]
            //     // parentSetStatus:'common',  // 如果当前组件为子组件时，其设置的状态， common: 共同设置(默认)    save: 保留不设置   child: 单独设置
            //     // 只有当前组件是容器组件时，一般只有设置数据才有，才会有eindex和index
            //     // 其中 eindex 指的是子组件在容器组件里面的位置
            //     //     index 指的是子组件的某个属性值value=数组，index表示在其中的位置，如公司组件的职位列表
            // },
            // background_image:{
            //     cn:'背景图片',
            //     en:'background_image',
            //     value:'none',
            //     type:'image',
            //     mold:'bg',
            //     edittype:'custom'
            // },
            // background_repeat:{
            //     cn:'背景重复',
            //     en:'background_repeat',
            //     value:'no-repeat',
            //     cnvalue:'不重复',
            //     type:'options',
            //     edittype:'custom',
            //     options:[{
            //         cn:'不重复',
            //         value:'no-repeat'
            //     },{
            //         cn:'重复',
            //         value:'repeat'
            //     },{
            //         cn:'横向重复',
            //         value:'repeat-x'
            //     },{
            //         cn:'纵向重复',
            //         value:'repeat-y'
            //     }]
            // },
            border_color:{
                cn:'边框颜色',
                en:'border_color',
                value:'#ffffff',
                type:'color',
                parent:'css',
                edittype:'custom'
            },
            border_width:{
                cn:'边框宽度',
                en:'border_width',
                value:0,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            border_style:{
                cn:'边框类型',
                en:'border_style',
                value:'none',
                cnvalue:'无',
                type:'options',
                parent:'css',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'无',   // 选项中文
                    value:'none' // 选项真正的值
                },{  // 选项的类容
                    cn:'实线',   // 选项中文
                    value:'solid' // 选项真正的值
                },{
                    cn:'虚线',
                    value:'dashed'
                },{
                    cn:'点状',
                    value:'dotted'
                },{
                    cn:'双线',
                    value:'double'
                }]
            },
            border_radius:{
                cn:'圆角',
                en:'border_radius',
                value:0,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            box_shadow_x:{
                cn:'阴影',
                en:'box_shadow_x',
                value:0,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            box_shadow_y:{
                cn:'', 
                en:'box_shadow_y',
                value:0,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            box_shadow_blur:{
                cn:'',
                en:'box_shadow_blur',
                value:0,
                type:'number',
                parent:'css',
                edittype:'custom'
            },
            box_shadow_color:{
                cn:'',
                en:'box_shadow_color',
                value:'#ffffff',
                type:'color',
                parent:'css',
                edittype:'custom'
            },
        },
        h5css:{
            //编辑类型：如果是自定义，则走自定义类型， 此值会影响设置函数，如：（其值的首字母会大写）
            // setValue -> setCustomValue
            // setMultipleValue -> setCustomMultipleValue
            width:{
                cn:'宽度',
                en:'width',
                value:300,
                type:'number',
                parent:'h5css',
                edittype:'custom'   
            },
            height:{
                cn:'高度',
                en:'height',
                value:400,
                type:'number',
                parent:'h5css',
                edittype:'custom'
            },
            background_type:{
                cn:'背景类型',
                en:'background_type',
                value:'background-color',
                cnvalue:'纯背景色',
                type:'options',
                parent:'h5css',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'纯背景色',   // 选项中文
                    value:'background-color' // 选项真正的值
                },{  // 选项的类容
                    cn:'背景图',   // 选项中文
                    value:'background-image' // 选项真正的值
                },{
                    cn:'上下渐变',
                    value:'gradient-top-bottom'
                },{
                    cn:'左右渐变',
                    value:'gradient-left-right'
                }],
                effect:['h5css.background_color','h5css.background_image','h5css.background_repeat',
                    'h5css.gradient_color_top','h5css.gradient_color_bottom',
                    'h5css.gradient_color_left','h5css.gradient_color_right']
            },
            background_color:{
                cn:'背景颜色',
                en:'background_color',
                value:'#ffffff',
                type:'color',
                parent:'h5css',
                edittype:'custom',
                condition:['background-color','background-image'],
                status:true
            },
            background_image:{
                cn:'背景图',
                en:'background_image',
                value:'none',
                type:'image',
                mold:'bg',
                edittype:'custom' ,
                parent:'h5css',
                condition:['background-image'],
                status:false
            },
            background_repeat:{
                cn:'背景重复',
                en:'background_repeat',
                value:'no-repeat',
                cnvalue:'不重复',
                type:'options',
                edittype:'custom',
                options:[{
                    cn:'不重复',
                    value:'no-repeat'
                },{
                    cn:'重复',
                    value:'repeat'
                },{
                    cn:'横向重复',
                    value:'repeat-x'
                },{
                    cn:'纵向重复',
                    value:'repeat-y'
                }],
                parent:'h5css',
                condition:['background-image'],
                status:false
            },
            gradient_color_top:{
                cn:'背景-上',
                en:'gradient_color_top',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'h5css',
                condition:['gradient-top-bottom'],
                status:false
            },
            gradient_color_bottom:{
                cn:'背景-下',
                en:'gradient_color_bottom',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'h5css',
                condition:['gradient-top-bottom'],
                status:false
            },
            gradient_color_left:{
                cn:'背景-左',
                en:'gradient_color_left',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'h5css',
                condition:['gradient-left-right'],
                status:false
            },
            gradient_color_right:{
                cn:'背景-右',
                en:'gradient_color_right',
                value:'#ffffff',
                type:'color',
                edittype:'custom',
                parent:'h5css',
                condition:['gradient-left-right'],
                status:false
            },
            border_color:{
                cn:'边框颜色',
                en:'border_color',
                value:'#ffffff',
                type:'color',
                parent:'h5css',
                edittype:'custom'
            },
            border_width:{
                cn:'边框宽度',
                en:'border_width',
                value:0,
                type:'number',
                parent:'h5css',
                edittype:'custom'
            },
            border_style:{
                cn:'边框类型',
                en:'border_style',
                value:'none',
                cnvalue:'无',
                type:'options',
                parent:'h5css',
                edittype:'custom',
                options:[{  // 选项的类容
                    cn:'无',   // 选项中文
                    value:'none' // 选项真正的值
                },{  // 选项的类容
                    cn:'实线',   // 选项中文
                    value:'solid' // 选项真正的值
                },{
                    cn:'虚线',
                    value:'dashed'
                },{
                    cn:'点状',
                    value:'dotted'
                },{
                    cn:'双线',
                    value:'double'
                }]
            },
            border_radius:{
                cn:'圆角',
                en:'border_radius',
                value:0,
                type:'number',
                parent:'h5css',
                edittype:'custom'
            },
            box_shadow_x:{
                cn:'阴影',
                en:'box_shadow_x',
                value:0,
                type:'number',
                parent:'h5css',
                edittype:'custom'
            },
            box_shadow_y:{
                cn:'', 
                en:'box_shadow_y',
                value:0,
                type:'number',
                parent:'h5css',
                edittype:'custom'
            },
            box_shadow_blur:{
                cn:'',
                en:'box_shadow_blur',
                value:0,
                type:'number',
                parent:'h5css',
                edittype:'custom'
            },
            box_shadow_color:{
                cn:'',
                en:'box_shadow_color',
                value:'#ffffff',
                type:'color',
                parent:'h5css',
                edittype:'custom'
            },
        },
        data:{  // 卡片数据
            // toH5:{
            //     cn:'适配移动端',
            //     en:'toH5',
            //     value:1,
            //     type:'checkbox',
            //     parent:'data'
            // },
            // toPC:{
            //     cn:'适配到PC',
            //     en:'toPC',
            //     value:1,
            //     type:'checkbox',
            //     parent:'data'
            // },
            // anchorID:{
            //     cn:'锚点ID',
            //     en:'anchorID',
            //     value:'',
            //     type:'text',
            //     parent:'data'
            // }
        },
        tempData:{
            path:'',
            elemData:null
        },
        selectStatus:false,
        selectStatusH5:false,
        promptStatus:false,
        promptStatusH5:false,
        selectID:'',
        elements:[],
        elements_h:[],
        activeStatus:'pc',  // 激活状态：pc   |   h5
        count:0,
        count_h:0
    },
    mutations:{
        init:(state,pagesData) => {
            state.pages = pagesData
        },
        clearCustomElements:(state) => {
            if(state.activeStatus == 'h5'){
                state.elements_h = []
                state.selectStatusH5 = false
                state.promptStatusH5 = false
                state.selectID = ''
                state.count_h = 0
            }else {
                state.elements = []
                state.selectStatus = false
                state.promptStatus = false
                state.selectID = ''
                state.count = 0
            }
        },
        changeCustomCount:(state) => {
            if(state.activeStatus == 'h5'){
                state.count_h++
            }else{
                state.count++
            }
        },
        changeCustomSelectStatus:(state,status) => {
            if(state.activeStatus == 'h5'){
                state.selectStatusH5 = status
            }else{
                state.selectStatus = status
            }
        },
        setCustomSelectedID:(state,id) => {
            state.selectID = id
        },
        setActiveStatus:(state,status) => {
            state.activeStatus = status
        },
        removeCustomComponent:(state,payload) => {
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
        addCustomElement:(state,payload) => {
            let length = 0
            if(state.activeStatus == 'h5'){
                length = state.elements_h.length
                payload.path = payload.path.replace('index',length)
                state.elements_h = state.elements_h.concat([payload])
            }else{
                length = state.elements.length
                payload.path = payload.path.replace('index',length)
                state.elements = state.elements.concat([payload])
            }
        },
        setCustomConditionStatus:(state,data) => {
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
        setCustomValue:(state,payload) => {
            let parent= payload.parent ? payload.parent : 'css',
                path = payload.path ? payload.path.split('.') : '',
                value = '',
                elemData = state,
                i = 0,
                current = null
            
            if(path){
                if(state.tempData.path == path && state.tempData.elemData){
                    elemData = state.tempData.elemData
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
                current = elemData.props[parent][payload.stylename]
                current.value = payload.designValue
                // if(current.hasOwnProperty('realvalue')){
                if(current.unit && current.unit != current.realunit){
                    current.realvalue = payload.actualValue
                }
                if(payload.cnvalue){
                    current.cnvalue = payload.cnvalue
                }
                payload.store.commit('setCustomConditionStatus',{
                    parent:elemData.props,
                    child:current
                })
            }else{  // 自定义外壳样式修改
                current = state[parent][payload.stylename]
                current.value = payload.designValue
                // if(current.hasOwnProperty('realvalue')){
                if(current.unit && current.unit != current.realunit){
                    current.realvalue = payload.actualValue
                }
                if(payload.cnvalue){
                    current.cnvalue = payload.cnvalue
                }
                payload.store.commit('setCustomConditionStatus',{
                    parent:state,
                    child:current
                })
            }
        },
        setCustomMultipleValue:(state,payload) => {
            let i = 0 ,
                parent = ''
                path = payload.path ? payload.path.split('.') : '',
                value = '',
                elemData = state,
                i = 0,
                current = null
            
            if(path){
                if(state.tempData.path == path && state.tempData.elemData){
                    elemData = state.tempData.elemData
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
                for(i = 0; i < payload.list.length; i++){
                    parent = payload.list[i].parent ? payload.list[i].parent : 'css'
                    current = elemData.props[parent][payload.list[i].stylename]
                    current.value = payload.list[i].designValue
                    // if(current.hasOwnProperty('realvalue')){
                    if(current.unit && current.unit != current.realunit){
                        current.realvalue = payload.actualValue
                    }
                    if(payload.list[i].cnvalue){
                        current.cnvalue = payload.list[i].cnvalue
                    }
                    payload.store.commit('setCustomConditionStatus',{
                        parent:elemData.props,
                        child:current
                    })
                }
            }else{  // 自定义外壳样式修改
                for(i = 0; i < payload.list.length; i++){
                    parent= payload.list[i].parent ? payload.list[i].parent : 'css'
                    current = state[parent][payload.list[i].stylename]
                    current.value = payload.list[i].designValue
                    // if(current.hasOwnProperty('realvalue')){
                    if(current.unit && current.unit != current.realunit){
                        current.realvalue = payload.actualValue
                    }
                    if(payload.list[i].cnvalue){
                        current.cnvalue = payload.list[i].cnvalue
                    }
                    payload.store.commit('setCustomConditionStatus',{
                        parent:state,
                        child:current
                    })
                }
            }
        }
    }
}
export default CUSTOM