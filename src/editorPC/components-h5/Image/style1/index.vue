<style>
    @import './index.css';
</style>
<template>
    <div class="image-style1" :id="props.id" yh-module="Image_style1"
        :ref="props.id"
        :style="{
            height:props.css.content_height.value+'px',
            backgroundColor:props.css.content_background_color.value,
        }"
        >
        <img class="yh-image-content"
            :style="{
                marginTop:(-props.css.content_height.value / 2 + 'px'),
                marginLeft:(-props.css.content_width.value / 2 + 'px')
            }"
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
            }
        },
        data(){
            return {
                
            }
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>