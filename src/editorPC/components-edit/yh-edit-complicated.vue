<!-- yh-edit  用于基础设置、事件设置、动画设置
    基础设置目前包括：font-size
                   width
                   height
                   line-height
                   color
                   background-color
                   image(不区分是src还是背景图，但传参时通过mold区分，mold="src" || mold ="bg")
                   border
                   box-shadow
    事件设置
    动画设置
    参数如下：
        props：包括组件的基本样式
        mold: 针对设置项图片的设置  mold="src" || mold ="bg"
        without：当前不需要那些设置，不需要为true，没有可不传
        setDisplayStatus(one)
-->
<template>
    <div class="yh-edit-layer clearfix hide" :ref="elem_id+'-yh-edit-layer'">
        <yh-edit-tab :props="tabOptions">
            <div v-if="getContentStatus('css')" :slot="setContentSlot('css')" class="yh-edit-tab-content yh-edit-css clearfix">
                <div v-if="!elements || elements.length == 0" class="yh-component-set">
                    <div v-for="one in css" :is="setModule(one)" 
                        v-if="one.type != 'none'" 
                        v-show="!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
                        :parent="css"
                        :options="one"
                        :elem_id="elem_id"
                        :ischild="ischild"
                        :path="path">
                    </div>
                </div>
                <div v-else class="yh-component-set">
                    <yh-edit-uplist
                        :options="{name:'外壳基本样式'}"
                        :status="true">
                        <div v-for="one in css" :is="setModule(one)" 
                            v-if="one.type != 'none'" 
                            v-show="!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
                            :parent="css"
                            :options="one"
                            :elem_id="elem_id"
                            :ischild="ischild"
                            :path="path">
                        </div>
                    </yh-edit-uplist>
                    <p class="child-split">子组件设置</p>
                    <div v-for="one in elements[0].props.css" :is="setModule(one)" 
                        v-if="one.type != 'none' && (!one.parentSetStatus || one.parentSetStatus == 'common')"
                        :parent="elements[0].props.css"
                        :options="one"
                        ischildset="ischildset"
                        :elem_id="elem_id"
                        :ischild="ischild"
                        :path="path">
                    </div>
                    <yh-edit-uplist v-for="(one,index) in elements" :key="index"
                        :status="getChildCssStatus(index)"
                        :options="{name:elements[index].props.data[elements[index].props.yh_data_name].value}"
                        :removeStatus="true"
                        :index="index"
                        :parentID="elem_id"
                        :path="path">
                        <div v-for="one in elements[index].props.css" :is="setModule(one)" 
                            v-if="one.type != 'none' && (one.parentSetStatus == 'child')"
                            :parent="elements[index].props.css"
                            :options="one"
                            :eindex="index"
                            ischildset="ischildset"
                            :elem_id="elem_id"
                            :ischild="ischild"
                            :path="path">
                        </div>
                    </yh-edit-uplist>
                </div>
            </div>
            <div v-if="getContentStatus('h5css')" :slot="setContentSlot('h5css')" class="yh-edit-tab-content yh-edit-deployh5 clearfix">
                <div v-if="!elements || elements.length == 0" class="yh-component-set">
                    <div v-for="one in h5css" :is="setModule(one)" v-if="one.type != 'none'" 
                        v-show="!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
                        :parent="h5css"
                        :options="one"
                        :elem_id="elem_id"
                        :ischild="ischild"
                        :path="path">
                    </div>
                </div>
                <div v-else class="yh-component-set">
                    <yh-edit-uplist
                        :options="{name:'外壳基本样式'}"
                        :status="true">
                        <div v-for="one in h5css" :is="setModule(one)" 
                            v-if="one.type != 'none'" 
                            v-show="!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
                            :parent="h5css"
                            :options="one"
                            :elem_id="elem_id"
                            :ischild="ischild"
                            :path="path">
                        </div>
                    </yh-edit-uplist>
                    <p class="child-split">子组件设置</p>
                    <div v-for="one in elements[0].props.h5css" :is="setModule(one)" 
                        v-if="one.type != 'none' && (!one.parentSetStatus || one.parentSetStatus == 'common')"
                        :parent="elements[0].props.h5css"
                        :options="one"
                        ischildset="ischildset"
                        :elem_id="elem_id"
                        :ischild="ischild"
                        :path="path">
                    </div>
                    <yh-edit-uplist v-for="(one,index) in elements" :key="index"
                        :status="getChildH5CssStatus(index)"
                        :options="{name:elements[index].props.data[elements[index].props.yh_data_name].value}"
                        :removeStatus="true"
                        :index="index"
                        :parentID="elem_id"
                        :path="path">
                        <div v-for="one in elements[index].props.h5css" :is="setModule(one)" 
                            v-if="one.type != 'none' && (one.parentSetStatus == 'child')"
                            :parent="elements[index].props.h5css"
                            :options="one"
                            :eindex="index"
                            ischildset="ischildset"
                            :elem_id="elem_id"
                            :ischild="ischild"
                            :path="path">
                        </div>
                    </yh-edit-uplist>
                </div>
            </div>
            <div v-if="getContentStatus('data')" :slot="setContentSlot('data')" class="yh-edit-tab-content yh-edit-owndata clearfix">
                <div v-if="!elements || elements.length == 0" class="yh-component-set">
                    <div v-for="one in owndata" :is="setModule(one)" v-if="one.type != 'none'" 
                        v-show="(!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))) && getChildSetStatus(one)"
                        :parent="owndata"
                        :options="one"
                        ischildset=""
                        :elem_id="elem_id"
                        :ischild="ischild"
                        :path="path"
                        :parentmodule="parentmodule">
                    </div>
                </div>
                <div v-else class="yh-component-set">
                    <yh-edit-uplist
                        :options="{name:'外壳数据设置'}"
                        :status="true">
                        <div v-for="one in owndata" :is="setModule(one)" v-if="one.type != 'none'" 
                            v-show="!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
                            :parent="owndata"
                            :options="one"
                            ischildset=""
                            :elem_id="elem_id"
                            :ischild="ischild"
                            :path="path">
                        </div>
                    </yh-edit-uplist>
                    <p class="child-split">子组件设置</p>
                    <div v-for="one in elements[0].props.owndata" :is="setModule(one)" 
                        v-if="one.type != 'none' && (one.parentSetStatus && one.parentSetStatus == 'common')"
                        :parent="elements[0].props.owndata"
                        :options="one"
                        ischildset="ischildset"
                        :elem_id="elem_id"
                        :ischild="ischild"
                        :path="path">
                    </div>
                    <yh-edit-uplist v-for="(one,index) in elements" :key="index"
                        :options="{name:elements[index].props.data[elements[index].props.yh_data_name].value}"
                        :status="getChildDataStatus(index)"
                        :removeStatus="true"
                        :index="index"
                        :parentID="elem_id"
                        :path="path">
                        <div v-for="one in elements[index].props.data" :is="setModule(one)"
                            v-if="one.type != 'none' && (!one.parentSetStatus || one.parentSetStatus == 'child')"
                            :parent="elements[index].props.data"
                            :options="one"
                            :eindex="index"
                            ischildset="ischildset"
                            :elem_id="elem_id"
                            :ischild="ischild"
                            :path="path">
                        </div>
                    </yh-edit-uplist>
                </div>
            </div>
        </yh-edit-tab>
        <div class="yh-delete-undo">
            <div class="yh-delete" @click.stop="removeElement">x</div>
            <div class="yh-undo" @click.stop="undoElement">√</div>
        </div>
    </div>
</template>
<script>
    import {
        undoSelected,
        getParentByAttr
    } from '../components/Base/Node.js'
    // components-edit
    import YHEditTab from './yh-edit-tab'
    import YHEditUplist from './yh-edit-uplist'
    import YHEditColor from './yh-edit-color'
    import YHEditImage from './yh-edit-image'
    import YHEditNumber from './yh-edit-number'
    import YHEditText from './yh-edit-text'
    import YHEditCheckbox from './yh-edit-checkbox'
    import YHEditTextarea from './yh-edit-textarea'
    import YHEditOptions from './yh-edit-options'
    import YHEditRequest from './yh-edit-request'
    import YHEditMutiple from './yh-edit-mutiple'
    // debugger
    export default {
        components:{
            'yh-edit-tab':YHEditTab,
            'yh-edit-uplist':YHEditUplist,
            'yh-edit-color':YHEditColor,
            'yh-edit-image':YHEditImage,
            'yh-edit-number':YHEditNumber,
            'yh-edit-text':YHEditText,
            'yh-edit-checkbox':YHEditCheckbox,
            'yh-edit-textarea':YHEditTextarea,
            'yh-edit-options':YHEditOptions,
            'yh-edit-request':YHEditRequest,
            'yh-edit-mutiple':YHEditMutiple
        },
        props:[
            'css',   // 基本样式 (同属common)
            'h5css',  // 移动端样式设置 (同属common)
            'common',  // 公共样式：主要用于列表的样式
            'nature',  // 基本属性：非PC样式，但必须的数据，存与elem的属性上，如: background_background_image_h5
            'elements',  // 只有LIST才有
            'owndata', // 组件的数据：如公司组件里公司名称、logo等
            'elem_id', // 当前组件的id
            'ignorestatus',  // 当前是否忽略样式设置
            'ischild',  // 当前是否子元素，用于yh-edit-number 的宽高设置
            'path',
            'parentmodule'
        ],
        data(){
            let tabs = []
            switch(this.ignorestatus){
                case 'ignorestatus':
                    tabs = [{
                        title:'数据设置',
                        type:'data'
                    }]
                    break
                default:
                    tabs = [{
                        title:'PC设置',
                        type:'css'
                    },{
                        title:'移动端设置',
                        type:'h5css'
                    },{
                        title:'数据设置',
                        type:'data'
                    }]
                    break
            }
            return {
                yhmodule:{
                    YHEditColor,
                    YHEditImage,
                    YHEditNumber,
                    YHEditText,
                    YHEditCheckbox,
                    YHEditTextarea,
                    YHEditRequest,
                    YHEditMutiple,
                    YHEditOptions
                },
                tabOptions:{
                    base:{
                        tabs:tabs
                    }
                }
            }
        },
        computed:{
            
        },
        methods:{
            getConditionValue(key){
                let temp = key.split('.'),
                    t = temp[0] == 'data' ? 'owndata' : temp[0]
                return this[t][temp[1]].status
            },
            getChildCssStatus(index){
                let css = this.elements[index].props.css,
                    status = false,
                    i = 0
                for(i in css){
                    if(css[i].parentSetStatus == 'child'){
                        status = true
                        break
                    }
                }
                return status
            },
            getChildH5CssStatus(index){
                let css = this.elements[index].props.h5css,
                    status = false,
                    i = 0
                for(i in css){
                    if(css[i].parentSetStatus == 'child'){
                        status = true
                        break
                    }
                }
                return status
            },
            getChildDataStatus(index){
                let data = this.elements[index].props.data,
                    status = false,
                    i = 0
                for(i in data){
                    if(!data[i].parentSetStatus || data[i].parentSetStatus == 'child'){
                        status = true
                        break
                    }
                }
                return status
            },
            getChildSetStatus(one){
                switch(one.en){
                    case 'toH5':
                    case 'toPC':
                    case 'anchorID':
                        let l = this.path.match(/(elements)/g).length
                        if(l == 2){
                            switch(this.parentmodule){
                                case 'List_style1':
                                    return false
                                    break
                            }
                        }
                        break
                }
                return true
            },
            setDisplayStatus(one){
                // return true
                if(one.condition){  // 条件判断
                    return one.status
                }else{
                    return true
                }
            },
            getContentStatus(value){
                let i = 0
                for(i = 0; i < this.tabOptions.base.tabs.length; i++){
                    if(this.tabOptions.base.tabs[i].type == value){
                        return true
                    }
                }
                return false
            },
            setContentSlot(value){
                let i = 0
                for(i = 0; i < this.tabOptions.base.tabs.length; i++){
                    if(this.tabOptions.base.tabs[i].type == value){
                        return 'content'+i
                    }
                }
                return 'content0'
            },
            setModule(one){
                switch(one.type){
                    case 'uplist':
                        return this.yhmodule.YHEditMutiple
                    default:
                        if(one.type){
                            return this.yhmodule['YHEdit'+one.type[0].toLocaleUpperCase()+one.type.slice(1)]
                        }else{
                            return this.yhmodule.YHEditColor
                        }
                }
            },
            removeElement(e){
                var elem = document.getElementsByClassName('setting')[0],
                    elemID = elem.getAttribute('id')
                this.$store.commit('removeElement',{
                    path:this.path
                })
                undoSelected()
            },
            undoElement(e){
                undoSelected()
            }
        }
     }
</script>
<style>
    .yh-edit-layer {
        /* width: 100%;
        height: 100%; */
        position: absolute;
        top: 0;
        left: 0;
        z-index:1000;
    }
    .yh-delete-undo{
        width:45px;
        height:17px;
        font-family: serif;
        /*position: absolute;
        left: 0;
        top: 0;*/
        position: fixed;
        right: 250px;
        top: 80px;
    }
    .yh-delete-undo .yh-delete,
    .yh-delete-undo .yh-undo {
        width: 17px;
        height: 17px;
        line-height: 17px;
        border: 1px solid #ff0084;
        border-radius: 17px;
        font-size: 12px;
        text-align: center;
        color: #ff0084;
        cursor: pointer;
        float:left;
        margin:0 3px 0 0;
    }
    .yh-delete-undo .yh-delete {
        font-family: initial;
    }
    .child-split {
        line-height: 30px;
        padding: 0 10px;
        margin: 5px 0;
        background-color: #ff0084;
        color: #fff;
        font-size: 14px;
    }
</style>