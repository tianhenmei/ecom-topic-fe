<template>
    <div class="yh-edit-options yh-edit-border clearfix">
        <border-width :options="options" :type="type"></border-width>
        <yh-edit-color 
            :options="color"
            :type="type"
            @setValue="setBorderColor" 
            @setChangeStatus="setChangeStatus" ></yh-edit-color>
        <border-style :options="options" :type="type"></border-style>
        <yh-edit-input :options="radius" :type="type" @setValue="setRadius"></yh-edit-input>
    </div>
</template>
<script>
    import YHEditColor from '../components-edit/yh-edit-color.vue'
    import borderWidth from '../components-edit/border-width.vue'
    import borderStyle from '../components-edit/border-style.vue'
    import YHEditInput from './yh-edit-input.vue'
    export default {
        components:{
            'yh-edit-color':YHEditColor,
            'border-width':borderWidth,
            'border-style':borderStyle,
            'yh-edit-input':YHEditInput,
        },
        props:['options','type'],
        data(){
            return {
                color:{
                    name:'边框',
                    mold:'color',
                    stylename:'border-color',
                    style:this.options,
                    isChild:true
                },
                radius:{
                    name:'圆角',
                    stylename:'border-radius',
                    unit:'px',
                    realunit:'px',
                    value:0,
                    type:'number',
                    isChild:true,
                    style:this.options
                },
                changeStatus:false
            }
        },
        methods:{
            setBorderWidth(name,value,designValue){
                this.setValue(name,value)
            },
            setBorderColor(name,value,designValue){
                this.setValue(name,value)
            },
            setBorderStyle(name,value,designValue){
                this.setValue(name,value)
            },
            setChangeStatus(status){
                this.changeStatus = true
                this.$emit('setChangeStatus',true)
            },
            setValue(name,value){
                this.$emit('setValue',name,value,value)
            },
            setRadius(name,actualValue,designValue){
                this.$store.commit('setValue',{
                    parent:this.type ? this.type.parent : 'style',
                    stylename:name,
                    actualValue:actualValue,
                    designValue:designValue
                })
                this.radius.style[name] = this.options[name]
                // this.$emit('setValue',name,actualValue,actualValue)
            }
        }
    }
</script>
<style>
    .yh-edit-options .yh-edit-border-style,
    .yh-edit-options .yh-edit-border-color,
    .yh-edit-options .yh-edit-border-width{
        float:left;
    }
    .yh-edit-border-width {
        width:90px;
    }
    .yh-edit-border-width .yh-edit-value{
        width: 40px;
    }
    .yh-edit-border-width .yh-edit-value input{
        width:25px;
    }
    .yh-edit-border-width .yh-edit-value span{
        width:15px;
    }


    .yh-edit-border-radius{
        width:115px;
    }
    .yh-edit-border-radius .yh-edit-text{
        width:45px;
    }
</style>