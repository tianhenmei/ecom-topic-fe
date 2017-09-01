<template>
    <div class="yh-edit-yhtextarea clearfix">
        <div class="yh-edit-text">{{optionsData.name}}{{optionsData.name ? '：' : ''}}</div>
        <div class="yh-edit-value clearfix">
            <textarea
                :class="{'yh-edit-value-input-long': !optionsData.unit}"
                :value="optionsData.style[optionsData.stylename] ? getDesignValue : (optionsData.type == 'number' ? 0 : '')"
                @input="setValue"
            ></textarea>
            <span v-if="optionsData.unit">{{optionsData.unit}}</span>
        </div>
        <slot name="chooser"></slot>
    </div>
</template>
<script>
    export default {
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
            return {
                optionsData:{
                    name:this.options.cn,
                    stylename:this.options.en,
                    unit:'',
                    realunit:'',
                    type:'text',
                    classname:'yhtextarea',
                    style:this.parent,
                    backstatus:true
                },
                changeStatus:false
            }
        },
        mounted(){
            
        },
        computed:{
            setClassname(){
                if(this.optionsData.classname){
                    return 'yh-edit-'+this.optionsData.classname
                }
                return ''
            },
            getDesignValue(){
                let actualValue = this.optionsData.style[this.optionsData.stylename].value
                if(this.optionsData.type === 'number'){
                    let value = parseFloat(actualValue)
                    if(this.optionsData.unit === this.optionsData.realunit){
                        return value
                    }
                    return this.getDesign(value)
                }
                return actualValue
            },
        },
        methods:{
            setValue(e){
                let target = e.target,
                    value = target.value,
                    type = this.options.edittype,
                    name = this.options.en,
                    edittype = type ? ('set'+type.substring(0,1).toUpperCase()+type.substring(1)+'Value')
                        : 'setValue'
                if(this.options.backstatus){
                    this.$emit('setValue',name,value,value)
                }else{
                    this.$store.commit(edittype,{
                        parent:this.options.parent ? this.options.parent : 'css',
                        eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                        index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                        ischildset:this.ischildset ? this.ischildset : '',
                        stylename:name,
                        actualValue:value,
                        designValue:value,
                        path:this.path,
                        store:this.$store
                    })
                }
            }
        }
    }
</script>
<style>
    .yh-edit-yhtextarea {
        width: 100%;
        padding: 0 0 5px 0;
        position:relative;
    }
    .yh-edit-yhtextarea .yh-edit-text {
        width: 80px;
        height: 25px;
        line-height: 25px;
        float: left;
        text-align: right;
        font-size: 12px;
        color: #666;
    }
    .yh-edit-yhtextarea .yh-edit-value{
        width: 145px;
        height: 60px;
        float:left;
    }
    .yh-edit-yhtextarea .yh-edit-value textarea{
        /*width: 113px;*/
        height: 60px;
        outline: none;
        resize: none;
    }
</style>