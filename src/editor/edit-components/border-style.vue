<template>
    <yh-edit-options :options="optionsData" @setValue="setValue"></yh-edit-options>
</template>
<script>
    import YHEditOptions from './yh-edit-options.vue'
    export default {
        components:{
            'yh-edit-options':YHEditOptions,
        },
        props:['options','type'],
        data(){
            return {
                optionsData:{
                    name:'边框样式',
                    stylename:'border-style',
                    unit:'',
                    realunit:'',
                    list:['无','实线','虚线','点状'],
                    realList:['none','solid','dashed','dotted'],
                    isChild:true,
                    type:'text',
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
            }
        }
    }
</script>

<style>
    .yh-edit-border-style {
        width:65px;
    }
    .yh-edit-border-style .yh-edit-text{
        display:none;
    }
    .yh-edit-border-style .yh-edit-value{
        width:40px;
    }
    .yh-edit-choose .yh-edit-list > ul > li,
    .yh-edit-choose .yh-edit-list > ul,
    .yh-edit-choose .yh-edit-list{
        width:100px;
    }
    .yh-edit-choose .yh-edit-list {
        width:108px;
    }
</style>