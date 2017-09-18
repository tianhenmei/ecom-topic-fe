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
-->
<template>
    <div class="yh-edit-layer clearfix">
        <yh-edit-tab :props="editOptions">
            <div class="yh-edit-tab-content yh-edit-basic clearfix" slot="content0">
                <div v-for="one in css" :is="setModule(one)" 
                    v-if="one.type != 'none'" 
                    v-show="!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
                    :parent="css"
                    :options="one"
                    :elem_id="elem_id"
                    :ischild="ischild"
                    :path="path">
                </div>
                <!-- <yh-edit-base 
                    :props="props" :mold="mold"
                    :basewith="basewith"
                    @setChangeStatus="setChangeStatus"></yh-edit-base> -->
            </div>
            <div class="yh-edit-tab-content yh-edit-data clearfix" :slot="'content'+yes.data">
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
                 <!-- <yh-edit-event :event="event"></yh-edit-event> -->
            </div>
            <div class="yh-edit-tab-content yh-edit-event clearfix" :slot="'content'+yes.event">
                <div v-for="one in event" :is="setModule(one)" v-if="one.type != 'none'" 
                    v-show="(!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))) && getChildSetStatus(one)"
                    :parent="event"
                    :options="one"
                    ischildset=""
                    :elem_id="elem_id"
                    :ischild="ischild"
                    :path="path"
                    :parentmodule="parentmodule">
                </div>
                 <!-- <yh-edit-event :event="event"></yh-edit-event> -->
            </div>
            <div class="yh-edit-tab-content yh-edit-status clearfix" :slot="'content'+yes.states">
                <div v-for="one in states" :is="setModule(one)" v-if="one.type != 'none'" 
                    v-show="(!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))) && getChildSetStatus(one)"
                    :parent="states"
                    :options="one"
                    ischildset=""
                    :elem_id="elem_id"
                    :ischild="ischild"
                    :path="path"
                    :parentmodule="parentmodule">
                </div>
                <!-- <yh-edit-state 
                    :props="states" :mold="mold" :stateswith="stateswith"
                    @setChangeStatus="setChangeStatus"></yh-edit-state> -->
            </div>
            <div class="yh-edit-tab-content yh-edit-animation clearfix" :slot="'content'+yes.animation">
            </div>
        </yh-edit-tab>
        <div class="yh-delete-undo">
            <div class="yh-delete" @click.stop="removeElement">x</div>
            <div class="yh-undo" @click.stop="undoElement">√</div>
        </div>
    </div>
</template>
<script>
    // components-edit
    import YHEditTab from './yh-edit-tab.vue'
    import YHEditUplist from './yh-edit-uplist.vue'
    import YHEditColor from './yh-edit-color.vue'
    import YHEditImage from './yh-edit-image.vue'
    import YHEditNumber from './yh-edit-number.vue'
    import YHEditText from './yh-edit-text.vue'
    import YHEditCheckbox from './yh-edit-checkbox.vue'
    import YHEditTextarea from './yh-edit-textarea.vue'
    import YHEditOptions from './yh-edit-options.vue'
    // import YHEditRequest from './yh-edit-request'
    // import YHEditMutiple from './yh-edit-mutiple'

    // edit-components
    // import YHEditTab from './yh-edit-tab'
    // import YHEditBase from './yh-edit-base'
    // import YHEditEvent from './yh-edit-event'
    // import YHEditState from './yh-edit-state'
    // debugger
    export default {
        components:{
            // 'yh-edit-tab':YHEditTab,
            // 'yh-edit-base':YHEditBase,
            // 'yh-edit-event':YHEditEvent,
            // 'yh-edit-state':YHEditState
            'yh-edit-tab':YHEditTab,
            'yh-edit-uplist':YHEditUplist,
            'yh-edit-color':YHEditColor,
            'yh-edit-image':YHEditImage,
            'yh-edit-number':YHEditNumber,
            'yh-edit-text':YHEditText,
            'yh-edit-checkbox':YHEditCheckbox,
            'yh-edit-textarea':YHEditTextarea,
            'yh-edit-options':YHEditOptions,
            // 'yh-edit-request':YHEditRequest,
            // 'yh-edit-mutiple':YHEditMutiple
        },
        props:[
            'ischild',
            'ignorestatus',
            'elem_id',
            'css',
            'states',
            'event',
            'owndata',
            'path',
            'parentmodule'
        ],
        data(){
            let self = this,
                tab = [],
                i = 0,j = 0,
                arr = ['css','data','event','states','animation'],
                arr2 = ['样式设置','数据设置','事件设置','状态设置','动画设置'],
                yes = {}
            for(i = 0; i < arr.length; i++ ){
                if(!(this.no && this.no[arr[i]])){
                    tab.push({
                        title:arr2[i]
                    })
                    yes[arr[i]] = j
                    j++
                }
            }
            return {
                href:'',
                animation:'',
                changeStatus:false,
                style:this.props,
                editOptions:{
                    position:{},
                    style:{},
                    classname:'yh-edit-tab',
                    base:{
                        tabs:tab
                    }
                },
                yhmodule:{
                    YHEditColor,
                    YHEditImage,
                    YHEditNumber,
                    YHEditText,
                    YHEditCheckbox,
                    YHEditTextarea,
                    // YHEditRequest,
                    // YHEditMutiple,
                    YHEditOptions
                },
                yes:yes
            }
        },
        methods:{
            setEvent(name,value,designValue){
                let elem = $('.setting'),
                    content = elem.find('.kitty-button-content'),
                    button = elem.find('.yh-button')
                
                this.props.href = designValue
            },
            setChangeStatus(status){
                this.changeStatus = true
                this.$emit('setChangeStatus',true)
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
            removeElement(e){
                var elem = $('.setting'),
                    elemID = elem.attr('id'),
                    path = elem.attr('yh-path');
                this.$store.commit('removeElement',{
                    path:path
                })
                $('.yh-selection').hide()
            },
            undoElement(e){
                $('.setting').removeClass('setting')
                $('.yh-selection').hide()
            }
        }
     }
</script>
<style>
    .yh-delete-undo{
        width:45px;
        height:17px;
        position:absolute;
        right:0;
        top:3px;
        font-family: serif;
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

    /*设置********************/
    .yh-edit-layer{
        width:500px;
        height:200px;
        display:none;
        position:absolute;
        left:50%;
        top:-200px;
        margin:0 0 0 -250px;
        background:#fff;
        border: 1px solid #ccc;
        z-index: 1000;
    }
</style>