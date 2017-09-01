<template>
    <yh-edit-uplist 
        :options="{name:options.cn}"
        :status="options.value">
        <yh-edit-uplist v-if="getObjectStatus"  v-for="(one,index) in options.value" :key="index"
            :options="{name:options.value[index][options.name].value}"
            :status="options.value[index]"
            :removeStatus="one.removeStatus">
            <div v-for="one in options.value[index]" :is="setModule(one)" v-if="one.type != 'none'"
                v-show="getChildSetStatus(one) && (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey)))))"
                :parent="options.value[index]"
                :eindex="eindex"
                :index="index"
                :options="one"
                :ischildset="ischildset"
                :elem_id="elem_id"
                :ischild="ischild"
                :path="path">
            </div>
        </yh-edit-uplist>
        <div v-for="one in options.value" :is="setModule(one)" 
            v-if="!getObjectStatus && one.type != 'none'"
            v-show="getChildSetStatus(one) && (!one.condition || (one.condition && one.status && (!one.conditionKey || (one.conditionKey && getConditionValue(one.conditionKey)))))"
            :parent="options.value"
            :eindex="eindex"
            :options="one"
            :ischildset="ischildset"
            :elem_id="elem_id"
            :ischild="ischild"
            :path="path">
        </div>
    </yh-edit-uplist>
</template>
<script>
    import {
        isArray,
        isObject
    } from '../components/Base/Node.js'
    import YHEditUplist from './yh-edit-uplist.vue'
    import YHEditColor from './yh-edit-color'
    import YHEditImage from './yh-edit-image'
    import YHEditNumber from './yh-edit-number'
    import YHEditText from './yh-edit-text'
    import YHEditCheckbox from './yh-edit-checkbox'
    import YHEditTextarea from './yh-edit-textarea'
    import YHEditOptions from './yh-edit-options'
    import YHEditRequest from './yh-edit-request'
    import YHEditMutiple from './yh-edit-mutiple'
    export default {
        components:{
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
            "eindex",   // 元素所在的elements中的索引
            'parent',
            'options',
            'elem_id',   // 当前被选中元素的ID
            'ischildset',  // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            'ischild',
            'path',
            'parentmodule'
        ],
        data(){
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
                optionsData:{
                    name:this.options.cn,
                    stylename:this.options.en,
                    unit:'',
                    realunit:'',
                    type:'text',
                    classname:'yhtext',
                    style:this.parent,
                    backstatus:true
                },
                changeStatus:false
            }
        },
        computed:{
            getObjectStatus(){
                return isArray(this.options.value)
            }
        },
        mounted(){
            
        },
        methods:{
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
            setValue(name,actualValue,value){
                if(this.options.backstatus){
                    this.$emit('setValue',name,value,value)
                }else{
                    this.$store.commit('setValue',{
                        parent:this.options.parent ? this.options.parent : 'css',
                        index:this.type ? this.type.index : -1,
                        ischildset:this.ischildset ? this.ischildset : '',
                        stylename:name,
                        actualValue:value,
                        designValue:value
                    })
                }
            },
            setModule(one){
                switch(one.type){
                    case 'image':
                        return this.yhmodule.YHEditImage
                    case 'number':
                        return this.yhmodule.YHEditNumber
                    case 'text':
                        return this.yhmodule.YHEditText
                    case 'checkbox':
                        return this.yhmodule.YHEditCheckbox
                    case 'textarea':
                        return this.yhmodule.YHEditTextarea
                    case 'options':
                        return this.yhmodule.YHEditOptions
                    case 'uplist':
                        return this.yhmodule.YHEditMutiple
                    case 'request':
                        return this.yhmodule.YHEditRequest
                    default:
                        return this.yhmodule.YHEditColor
                }
            }
        }
    }
</script>
<style>
    .yh-edit-yhtext {
        width: 100%;
        padding: 0 0 5px 0;
        position:relative;
    }
    .yh-edit-yhtext .yh-edit-value{
        width: 145px;
    }
    .yh-edit-yhtext .yh-edit-value input{
        width: 113px;
    }
</style>