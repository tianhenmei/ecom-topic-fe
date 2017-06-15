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
                    name:'字体大小',
                    stylename:'font-size',
                    unit:'px',
                    realunit:'rem',
                    list:[24, 26, 28, 30, 36,
                          38, 40, 42, 44, 46, 
                          48, 60, 72, 96, 108, 120],
                    realList:[0.512, 0.555, 0.597, 0.64, 0.768, 
                            0.811, 0.853, 0.896, 0.937,0.981, 
                            1.024, 1.28, 1.536, 2.048, 2.304, 2.56],
                    type:'number',
                    style:this.options
                }
            }
        },
        methods:{
            setValue(name,actualValue,designValue){
                let stylename = 'font-size'
                this.$store.commit('setValue',{
                    parent:this.type ? this.type.parent : 'style',
                    index:this.type ? this.type.index : -1,
                    stylename:stylename,
                    actualValue:actualValue,
                    designValue:designValue
                })
                this.optionsData.style[stylename] = this.options[stylename]
            }
        }
    }
</script>

<style>
    
</style>