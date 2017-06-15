<!-- yh-edit  用于基础设置、事件设置、动画设置
    基础设置目前包括：font-size
                   width
                   height
                   line-height
                   color
                   background-color
                   image(不区分是src还是背景图，但传参时通过mold区分，mold="src" || mold ="bg")
                   border
                   box-shadow
    事件设置
    动画设置
    参数如下：
        props：包括组件的基本样式
        mold: 针对设置项图片的设置  mold="src" || mold ="bg"
        without：当前不需要那些设置，不需要为true，没有可不传
-->
<template>
    <div class="yh-edit-layer clearfix hide" :ref="parent_id+'-yh-edit-layer'">
        <yh-edit-tab :props="tabOptions">
            <div slot="content0" class="yh-edit-tab-content yh-edit-css clearfix">
                <div v-for="one in css" :is="yhmodule.YHEditColor"
                    :parent="css"
                    :options="one">
                </div>
            </div>
            <div slot="content1" class="yh-edit-tab-content yh-edit-deployh5 clearfix">
                <div>移动端设置</div>
            </div>
            <div slot="content2" class="yh-edit-tab-content yh-edit-owndata clearfix">
                <div>数据设置</div>
            </div>
        </yh-edit-tab>
        <div class="yh-delete-undo">
            <div class="yh-delete" @click.stop="removeElement">x</div>
            <div class="yh-undo" @click.stop="undoElement">√</div>
        </div>
    </div>
</template>
<script>
    // edit-components
    import YHEditTab from './yh-edit-tab'
    import YHEditColor from './yh-edit-color'
    // debugger
    export default {
        components:{
            'yh-edit-tab':YHEditTab,
            'yh-edit-color':YHEditColor
        },
        props:['css','common','owndata','parent_id'],
        data(){
            return {
                yhmodule:{
                    YHEditColor
                },
                tabOptions:{
                    base:{
                        tabs:[{
                            title:'样式设置'
                        },{
                            title:'移动端设置'
                        },{
                            title:'数据设置'
                        }]
                    }
                }
            }
        },
        methods:{
            removeElement(e){
                var elem = $('.setting'),
                    elemID = elem.attr('id');
                this.$store.commit('removeElement',elemID)
                $('.setting').removeClass('setting')
                $('.yh-edit-layer').addClass('hide')
                $('.yh-selection').hide()
            },
            undoElement(e){
                $('.setting').removeClass('setting')
                $('.yh-edit-layer').addClass('hide')
                $('.yh-selection').hide()
            }
        }
     }
</script>
<style>
    .yh-edit-layer {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index:1000;
    }
    .yh-delete-undo{
        width:45px;
        height:17px;
        font-family: serif;
        position: absolute;
        left: 0;
        top: 0;
    }
    .yh-delete-undo .yh-delete,
    .yh-delete-undo .yh-undo {
        width: 17px;
        height: 17px;
        line-height: 17px;
        border: 1px solid #ff0084;
        border-radius: 17px;
        font-size: 12px;
        text-align: center;
        color: #ff0084;
        cursor: pointer;
        float:left;
        margin:0 3px 0 0;
    }
    .yh-delete-undo .yh-delete {
        font-family: initial;
    }
</style>