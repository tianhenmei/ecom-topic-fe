<template>
    <yh-edit-input 
        @setValue="setValue" 
        :options="optionsData"
        :ischildset="ischildset"
        :ischild="ischild"
        :eindex="eindex"
        :index="index"
        :path="path" >
    </yh-edit-input>
</template>
<script>
    import {settingBox} from '../js/Node.js'
    import YHEditInput from './yh-edit-input.vue'
    export default {
        components:{
            'yh-edit-input':YHEditInput,
        },
        props:[
            'eindex',
            'index',
            'parent',
            'options',
            'elem_id',   // 当前被选中元素的ID
            'ischildset',  // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            'ischild',
            'path'
        ],
        data(){
            let hasdef = false,
                def = 'auto',
                type = 'number'
            if(this.parent[this.options.en].hasOwnProperty('ivalue')){
                hasdef = true
                if(this.parent[this.options.en].value == 'auto'){
                    type = 'text'
                    def = this.parent[this.options.en].ivalue
                }
            }
            return {
                optionsData:{
                    name:this.options.cn,
                    stylename:this.options.en,
                    parent:this.options.parent,
                    unit:this.options.unit ? this.options.unit : 'px',
                    realunit:this.options.realunit ? this.options.realunit : 'rem',
                    type:type,
                    classname:'number',
                    style:this.parent,
                    hasdef:hasdef,
                    def:def,
                    default:this.options.default,
                    ivalue:this.options.ivalue,
                    backstatus:false
                },
                changeStatus:false
            }
        },
        mounted(){
            // @mouseenter="showEditLayer"
            // @mouseleave="hideEditLayer"
            var textInput = this.$el.getElementsByClassName('yh-edit-value')[0].getElementsByTagName('input')[0]
            textInput.addEventListener('focus',this.showEditLayer)
            this.$el.addEventListener('mouseleave',this.hideEditLayer)
        },
        methods:{
            settingBox,
            showEditLayer(e){
                // $(e.target).closest('.yh-edit-input').find('.yh-edit-list').show()
                this.changeStatus = false
            },
            hideEditLayer(e){
                if(!this.changeStatus){
                    // $(e.target).closest('.yh-edit-input').find('.yh-edit-list').hide()
                }
            },
            setValue(name,actualValue,designValue){
                let type = this.options.edittype,
                    edittype = type ? ('set'+type.substring(0,1).toUpperCase()+type.substring(1)+'Value')
                        : 'setValue'
                if(this.options.backstatus){
                    this.$emit('setValue',name,actualValue,designValue)
                }else{
                    this.$store.commit(edittype,{
                        parent:this.options.parent ? this.options.parent : 'css',
                        eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                        index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                        ischildset:this.ischildset ? this.ischildset : '',
                        stylename:name,
                        actualValue:actualValue,
                        designValue:designValue,
                        path:this.path,
                        store:this.$store
                    })
                    // 非实时
                    // switch(name){
                    //     case 'width':
                    //     case 'height':
                    //         // console.log(document.getElementById(this.elem_id).clientHeight)
                    //         this.settingBox(document.getElementById(this.elem_id),this.ischild);
                    //         break
                    // }
                }
            }
        }
    }
</script>
<style>
    .yh-edit-number {
        width: 100%;
        padding: 0 0 5px 0;
        position:relative;
    }
    .yh-edit-number .yh-edit-value{
        width: 145px;
    }
    .yh-edit-number .yh-edit-value input{
        width: 113px;
    }
</style>