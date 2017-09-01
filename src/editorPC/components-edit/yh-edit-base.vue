<template>
    <div class="yh-base-edit-layer clearfix" :class="{'hide':!editLayerStatus}" :ref="elem_id+'-yh-base-edit-layer'">
        <yh-edit-tab :props="tabOptions">
            <div :slot="setContentSlot('css')" class="yh-edit-tab-content yh-edit-css clearfix">
                <div v-for="one in css" :is="setModule(one)" 
                    v-if="one.type != 'none'" 
                    v-show="!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
                    :parent="css"
                    :options="one"
                    :elem_id="elem_id"
                    :eindex="eindex"
                    :path="path">
                </div>
            </div>
            <div :slot="setContentSlot('data')" class="yh-edit-tab-content yh-edit-data clearfix">
                <div v-for="one in owndata" :is="setModule(one)" 
                    v-if="one.type != 'none'" 
                    v-show="!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
                    :parent="owndata"
                    :options="one"
                    :elem_id="elem_id"
                    :eindex="eindex"
                    :path="path">
                </div>
            </div>
            <div :slot="setContentSlot('event')" class="yh-edit-tab-content yh-edit-event clearfix">
                <div v-for="one in event" :is="setModule(one)" 
                    v-if="one.type != 'none'" 
                    v-show="!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey))))"
                    :parent="event"
                    :options="one"
                    :elem_id="elem_id"
                    :eindex="eindex"
                    :path="path">
                </div>
            </div>
        </yh-edit-tab>
        <div class="yh-custom-operation">
            <div class="yh-custom-remove" @click.stop.prevent="removeCustomComponent">&#10005;</div>
            <div class="yh-custom-undo" @click.stop.prevent="undoCustomSelected">&#10003;</div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import YHEditTab from './yh-edit-tab'
    import YHEditColor from './yh-edit-color'
    import YHEditImage from './yh-edit-image'
    import YHEditNumber from './yh-edit-number'
    import YHEditText from './yh-edit-text'
    import YHEditTextarea from './yh-edit-textarea'
    import YHEditOptions from './yh-edit-options'
    // import YHEditShadow from './yh-edit-shadow'
    export default {
        components:{
            'yh-edit-tab':YHEditTab,
            'yh-edit-color':YHEditColor,
            'yh-edit-image':YHEditImage,
            'yh-edit-number':YHEditNumber,
            'yh-edit-text':YHEditText,
            'yh-edit-textarea':YHEditTextarea,
            'yh-edit-options':YHEditOptions,
            // 'yh-edit-shadow':YHEditShadow
        },
        props:[
            'css',
            'h5css',
            'elem_id',
            'owndata',
            'event',
            'eindex',
            'path',
            'custom',  // 如果是'custom'，则设置自定义组件的值
            'editLayerStatus'
        ],
        data(){
            let tabs = [{
                title:'基础样式设置',
                type:'css'
            },{
                title:'编辑配置',
                type:'data'
            },{
                title:'事件设置',
                type:'event'
            }]
            return {
                yhmodule:{
                    YHEditColor,
                    YHEditImage,
                    YHEditNumber,
                    YHEditText,
                    YHEditTextarea,
                    YHEditOptions,
                    // YHEditShadow
                },
                tabOptions:{
                    base:{
                        tabs:tabs
                    }
                }
            }
        },
        computed:{
            ...mapState({
                selectID: state => state.custom.selectID
            }),
        },
        methods:{
            getConditionValue(key){
                let temp = key.split('.'),
                    t = temp[0] == 'data' ? 'owndata' : temp[0]
                return this[t][temp[1]].status
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
            setContentSlot(value){
                let i = 0
                for(i = 0; i < this.tabOptions.base.tabs.length; i++){
                    if(this.tabOptions.base.tabs[i].type == value){
                        return 'content'+i
                    }
                }
                return 'content0'
            },
            removeCustomComponent(e){
                this.$store.commit('changeCustomSelectStatus',false)
                this.$store.commit('removeCustomComponent',{
                    path:this.path
                })
            },
            undoCustomSelected(e){
                // let top = this.$parent.$parent.$refs['yh-custom-select0'],
                    // right = this.$parent.$parent.$refs['yh-custom-select1'],
                    // bottom = this.$parent.$parent.$refs['yh-custom-select2'],
                    // left = this.$parent.$parent.$refs['yh-custom-select3']
                if(this.selectID){
                    let children = this.$parent.$parent.$children,
                        i = 0
                    for(i = 0; i < children.length; i++){
                        if(children[i].props && children[i].props.id == this.selectID){
                            children[i].$data.editLayerStatus = false
                            break
                        }
                        
                    }
                    this.$store.commit('setCustomSelectedID','')
                    this.$store.commit('changeCustomSelectStatus',false)
                }
            }
        }
    }
</script>
<style lang="scss">
    .yh-base-edit-layer {
        width: 500px;
        height: 181px;
        background: #fff;
        border: 1px solid #ff0084;
        position: absolute;
        left: 50%;
        top: -181px;
        z-index:10;
        margin: 0 0 0 -250px;
        .yh-edit-tab {
            position: relative;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            overflow: visible;
        }
        .yh-edit-data,
        .yh-edit-event,
        .yh-edit-css{
            > div{
                float:left;
            }
            .yh-edit-input.yh-edit-yhtext {
                width: 230px;
            }
            .yh-edit-input .yh-edit-text,
            .yh-edit-image .yh-edit-text,
            .yh-edit-options .yh-edit-text,
            .yh-edit-options .yh-edit-value,
            .yh-edit-image .yh-edit-value,
            .yh-edit-input .yh-edit-value input{
                color:#666;
            }
            .yh-edit-input .yh-edit-text {
                width:60px;
            }
        }
        .yh-edit-options,
        .yh-edit-number,
        .yh-edit-color {
            width: 125px;
            .yh-edit-text {
                width: 60px;
            }
            .yh-edit-value{
                width: 40px;
            }
            .yh-edit-value input{
                width: 38px;
            }
            .yh-edit-chooser{
                width:20px;
            }
            .yh-edit-chooser input{
                width:20px;
            }
        }
        .yh-eidt-combine.yh-edit-input {
            width:65px;
        }
        .yh-edit-options {
            width: 147px;
            .yh-edit-value {
                width:60px;
            }
        }
        .yh-edit-number {
            .yh-edit-value {
                width:55px;
                span {
                    width: 15px;
                }
            }
        }
        .yh-edit-image {
            width:200px;
            .yh-edit-text {
                width: 60px;
            }
            .yh-edit-image-local{
                left:180px;
            }
        }
        .yh-edit-yhtextarea {
            .yh-edit-text {
                width:60px;
            }
            .yh-edit-value {
                width:400px;
                textarea {
                    width: 397px;
                }
            }
        }
        .yh-custom-operation {
            width:60px;
            height:20px;
            position:absolute;
            right:0;
            top:6px;
            > div {
                width:18px;
                height:18px;
                line-height:18px;
                border:1px solid #ff0084;
                border-radius:30px;
                float:left;
                color:#ff0084;
                text-align:center;
                font-size:12px;
                margin:0 10px 0 0;
                cursor:pointer;
            }
        }
    }
</style>