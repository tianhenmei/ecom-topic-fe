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
                    name:'边框',
                    stylename:'border-width',
                    unit:'px',
                    realunit:'px',
                    type:'number',
                    isChild:true,
                    style:this.options
                }
            }
        },
        methods:{
            setValue(name,actualValue,designValue){
                this.$store.commit('setValue',{
                    parent:this.type ? this.type.parent : 'style',
                    stylename:name,
                    actualValue:actualValue,
                    designValue:designValue
                })
                this.optionsData.style[name] = this.options[name]
            }
        }
    }
</script>
<style>
    .yh-edit-border-width{
        width:115px;
    }
    .yh-edit-border-width .yh-edit-text {
        width:45px;
    }
</style>