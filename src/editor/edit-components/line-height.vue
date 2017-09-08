<template>
    <yh-edit-input @setValue="setValue" :options="optionsData" :type="type"></yh-edit-input>
</template>
<script>
    import YHEditInput from './yh-edit-input.vue'
    export default {
        components:{
            'yh-edit-input':YHEditInput,
        },
        props:['options','type'],
        data(){
            return {
                optionsData:{
                    name:'行高',
                    stylename:'line-height',
                    unit:'px',
                    realunit:'rem',
                    type:'number',
                    style:this.options
                }
            }
        },
        methods:{
            setValue(name,actualValue,designValue){
                this.$store.commit('setValue',{
                    parent:this.type ? this.type.parent : 'style',
                    index:this.type ? this.type.index : -1,
                    stylename:name,
                    actualValue:actualValue,
                    designValue:designValue
                })
                this.optionsData.style[name] = this.options[name]
                // this.$emit('setValue',name,actualValue,designValue)
            }
        }
    }
</script>
<style>
    .yh-edit-line-height{
        width:115px;
    }
    .yh-edit-line-height .yh-edit-text {
        width:45px;
    }
</style>