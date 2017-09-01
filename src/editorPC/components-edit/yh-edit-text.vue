<template>
    <yh-edit-input 
        @setValue="setValue" 
        :options="optionsData"
        :ischildset="ischildset"
        :eindex="eindex"
        :index="index"
        :path="path" >
    </yh-edit-input>
</template>
<script>
    import YHEditInput from './yh-edit-input.vue'
    export default {
        components:{
            'yh-edit-input':YHEditInput,
        },
        props:[
            'eindex',
            'index',  // index
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
                    classname:'yhtext',
                    style:this.parent,
                    edittype:this.options.edittype,
                    backstatus:true
                },
                changeStatus:false
            }
        },
        mounted(){
            
        },
        methods:{
            // yh-edit-text
            setValue(name,actualValue,value){
                let type = this.options.edittype,
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