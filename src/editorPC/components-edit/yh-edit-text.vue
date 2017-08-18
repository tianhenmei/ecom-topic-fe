<template>
    <yh-edit-input 
        @setValue="setValue" 
        :options="optionsData"
        :ischildset="ischildset"
        :eindex="eindex"
        :index="index" >
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
            'ischild'
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
                    backstatus:true
                },
                changeStatus:false
            }
        },
        mounted(){
            
        },
        methods:{
            setValue(name,actualValue,value){
                if(this.options.backstatus){
                    this.$emit('setValue',name,value,value)
                }else{
                    this.$store.commit('setValue',{
                        parent:this.options.parent ? this.options.parent : 'css',
                        eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                        index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                        ischildset:this.ischildset ? this.ischildset : '',
                        stylename:name,
                        actualValue:value,
                        designValue:value
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