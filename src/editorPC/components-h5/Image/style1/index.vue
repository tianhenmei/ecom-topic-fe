<style>
    @import './index.css';
</style>
<template>
    <div class="image-style1" :id="props.id" yh-module="Image_style1"
        :ref="props.id"
        :style="setParentStyle()"
        >
        <img class="yh-image-content"
            :class="getClassName"
            :style="setImageStyle()"
            :src="props.css.content_src.value" />
    </div>
</template>
<script>
    export default {
        props:['props','path','parentmodule'],
        computed:{
            setImage(){
                let src = this.props.css.background_background_image.value.trim()
                switch(src){
                    case 'none':
                        return src
                    case 'undefined':
                        return 'none'
                    default:
                        return 'url('+src+')'
                }
            },
            getClassName(){
                let classname = ''
                switch(this.props.css.content_width.value){
                    case 750:
                        classname = 'yh-image-relative'
                        break
                    default:
                        classname = ''
                        break
                }
                return classname
            }
        },
        data(){
            return {
                
            }
        },
        mounted(){
            
        },
        methods:{
            getRemValue(value){
                return value / (750 / 16)
            },
            setParentStyle(){
                let style  = {}
                switch(this.props.css.content_width.value){
                    case 750:
                        style = {
                            width:'100%',
                            backgroundColor:this.props.css.content_background_color.value,
                        }
                        break
                    default:
                        style = {
                            height:this.getRemValue(this.props.css.content_height.value)+'rem',
                            backgroundColor:this.props.css.content_background_color.value,
                        }
                        break
                }
                return style
            },
            setImageStyle(){
                let style  = {}
                switch(this.props.css.content_width.value){
                    case 750:
                        style = {
                            width:'100%'
                            // backgroundColor:this.props.css.content_background_color.value,
                        }
                        break
                    default:
                        style = {
                            height:this.getRemValue(this.props.css.content_height.value)+'rem',
                            marginTop:(this.getRemValue(-this.props.css.content_height.value / 2) + 'rem'),
                            marginLeft:(this.getRemValue(-this.props.css.content_width.value / 2) + 'rem')
                        }
                        break
                }
                return style
            }
        }
    }
</script>