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
            :src="props.h5css.content_src.value" />
    </div>
</template>
<script>
    export default {
        props:['props','path','parentmodule'],
        computed:{
            setImage(){
                let src = this.props.h5css.background_background_image.value.trim()
                switch(src){
                    case 'none':
                    case 'undefined':
                        return 'https://activity.lagou.com/topic/static/img/newEdit/image.png'
                    default:
                        return src
                }
            },
            getClassName(){
                let classname = ''
                switch(this.props.h5css.content_width.value){
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
                return (value / (750 / 16)).toFixed(2)
            },
            setParentStyle(){
                let style  = {}
                switch(this.props.h5css.content_width.value){
                    case 750:
                        style = {
                            width:'100%',
                            height:'auto',
                            backgroundColor:this.props.h5css.content_background_color.value,
                        }
                        break
                    default:
                        style = {
                            width:this.getRemValue(this.props.h5css.content_width.value)+'rem',
                            height:this.getRemValue(this.props.h5css.content_height.value)+'rem',
                            backgroundColor:this.props.h5css.content_background_color.value,
                        }
                        break
                }
                return style
            },
            setImageStyle(){
                let style  = {}
                switch(this.props.h5css.content_width.value){
                    case 750:
                        style = {
                            width:'100%'
                            // backgroundColor:this.props.h5css.content_background_color.value,
                        }
                        break
                    default:
                        style = {
                            width:this.getRemValue(this.props.h5css.content_width.value)+'rem',
                            height:this.getRemValue(this.props.h5css.content_height.value)+'rem',
                            // marginTop:(this.getRemValue(-this.props.h5css.content_height.value / 2) + 'rem'),
                            marginLeft:(this.getRemValue(-this.props.h5css.content_width.value / 2) + 'rem')
                        }
                        break
                }
                return style
            }
        }
    }
</script>