<template>
    <div components-edit>
        <div class="yh-components-edit">
            <ul>
                <li yh-module-name="yh-text" @click.prevent.stop="addComponents">
                    <span class="yh-edit-word">文字</span>
                    <span class="yh-edit-icon"></span>
                </li>
                <li yh-module-name="yh-image" @click.prevent.stop="addComponents">
                    <span class="yh-edit-word">图片</span>
                    <span class="yh-edit-icon"></span>
                </li>
                <li yh-module-name="yh-button" @click.prevent.stop="addComponents">
                    <span class="yh-edit-word">按钮</span>
                    <span class="yh-edit-icon"></span>
                </li>
                <li yh-module-name="yh-tab" @click.prevent.stop="addComponents">
                    <span class="yh-edit-word">tab切换</span>
                    <span class="yh-edit-icon"></span>
                </li>
                <li yh-module-name="yh-form" @click.prevent.stop="addComponents">
                    <span class="yh-edit-word">表单</span>
                    <span class="yh-edit-icon"></span>
                </li>
                <li yh-module-name="yh-audio" @click.prevent.stop="addComponents">
                    <span class="yh-edit-word">音乐</span>
                    <span class="yh-edit-icon"></span>
                </li>
                <li yh-module-name="yh-video" @click.prevent.stop="addComponents">
                    <span class="yh-edit-word">视频</span>
                    <span class="yh-edit-icon"></span>
                </li>
                <li @click.prevent.stop="savePage">
                    <span class="yh-edit-word">保存</span>
                    <span class="yh-edit-icon"></span>
                </li>
                <li @click.prevent.stop="previewPage">
                    <span class="yh-edit-word">预览</span>
                    <span class="yh-edit-icon"></span>
                </li>
                <li @mouseenter.prevent.stop="mouseenterChange" @mouseleave.prevent.stop="mouseleaveChange">
                    <span class="yh-edit-word">切换</span>
                    <span class="yh-edit-icon"></span>
                    <div class="yh-page-change">
                        <ul @click.prevent.stop="pageAnimation">
                            <li change="move">上下滑动</li>
                            <li change="cube">扇形翻页</li>
                            <!--<li change="cube">立体翻转</li>-->
                            <li change="cover">覆盖</li>
                            <!--<li change="push">扇形翻页</li>-->
                            <!--<li change="glue">缩放层叠</li>-->
                            <li change="carousel">层叠</li>
                            <li change="scale">覆盖缩小</li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div class="yh-animation">
                <div class="yh-animate" @mouseenter.stop.prevent="showAnimate" @mouseleave.stop.prevent="hideAnimate">
                    <h3 class="yh-atitle">动画</h3>
                    <ul class="yh-acontent" @click.stop.prevent="addAnimation">
                        <li animation="yh-opacity">淡入</li>
                        <li animation="yh-rotate">旋转</li>
                        <li animation="yh-width">宽度变化</li>
                        <li animation="yh-height">高度变化</li>
                        <li animation="yh-left">从左进入</li>
                        <li animation="yh-right">从右进入</li>
                        <li animation="yh-top">从上进入</li>
                        <li animation="yh-bottom">从下进入</li>
                        <li animation="yh-lfade">从左淡入</li>
                        <li animation="yh-rfade">从右淡入</li>
                        <li animation="yh-tfade">从上淡入</li>
                        <li animation="yh-bfade">从下淡入</li>
                        <li animation="yh-lbounce">从左弹跳进入</li>
                        <li animation="yh-rbounce">从右弹跳进入</li>
                        <li animation="yh-tbounce">从上弹跳进入</li>
                        <li animation="yh-bbounce">从下弹跳进入</li>
                    </ul>
                </div>
                <div class="yh-delay" @mouseenter.stop.prevent="showDelay" @mouseleave.stop.prevent="hideDelay">
                    <h3 class="yh-dtitle">延迟</h3>
                    <ul class="yh-dcontent" @click.stop.prevent="addDelay">
                        <li delay="yh-delay0-5">0.5s</li>
                        <li delay="yh-delay1-0">1.0s</li>
                        <li delay="yh-delay1-5">1.5s</li>
                        <li delay="yh-delay2-0">2.0s</li>
                        <li delay="yh-delay2-5">2.5s</li>
                        <li delay="yh-delay3-0">3.0s</li>
                        <li delay="yh-delay3-5">3.5s</li>
                        <li delay="yh-delay4-0">4.0s</li>
                        <li delay="yh-delay4-5">4.5s</li>
                        <li delay="yh-delay5-0">5.0s</li>
                        <li delay="yh-delay5-5">5.5s</li>
                        <li delay="yh-delay6-0">6.0s</li>
                        <li delay="yh-delay6-5">6.5s</li>
                        <li delay="yh-delay7-0">7.0s</li>
                        <li delay="yh-delay7-5">7.5s</li>
                        <li delay="yh-delay8-0">8.0s</li>
                        <li delay="yh-delay8-5">8.5s</li>
                        <li delay="yh-delay9-0">9.0s</li>
                        <li delay="yh-delay9-5">9.5s</li>
                        <li delay="yh-delay10-0">10.0s</li>
                    </ul>
                </div>
                <div class="yh-duration" @mouseenter.stop.prevent="showDuration" @mouseleave.stop.prevent="hideDuration">
                    <h3 class="yh-dtitle">时间</h3>
                    <ul class="yh-adcontent" @click.stop.prevent="addDuration">
                        <li duration="yh-duration0-5">0.5s</li>
                        <li duration="yh-duration1-0">1.0s</li>
                        <li duration="yh-duration1-5">1.5s</li>
                        <li duration="yh-duration2-0">2.0s</li>
                        <li duration="yh-duration2-5">2.5s</li>
                        <li duration="yh-duration3-0">3.0s</li>
                        <li duration="yh-duration3-5">3.5s</li>
                        <li duration="yh-duration4-0">4.0s</li>
                        <li duration="yh-duration4-5">4.5s</li>
                        <li duration="yh-duration5-0">5.0s</li>
                        <li duration="yh-duration5-5">5.5s</li>
                        <li duration="yh-duration6-0">6.0s</li>
                        <li duration="yh-duration6-5">6.5s</li>
                        <li duration="yh-duration7-0">7.0s</li>
                        <li duration="yh-duration7-5">7.5s</li>
                        <li duration="yh-duration8-0">8.0s</li>
                        <li duration="yh-duration8-5">8.5s</li>
                        <li duration="yh-duration9-0">9.0s</li>
                        <li duration="yh-duration9-5">9.5s</li>
                        <li duration="yh-duration10-0">10.0s</li>
                    </ul>
                </div>
                <div class="yh-function" @mouseenter.stop.prevent="showFunction" @mouseleave.stop.prevent="hideFunction">
                    <h3 class="yh-ftitle">轨迹</h3>
                    <ul class="yh-fcontent" @click.stop.prevent="addFunction">
                        <li function="yh-function-linear">线性</li>
                        <li function="yh-function-easeInOut">低速开始和结束</li>
                        <li function="yh-function-easeIn">低速开始</li>
                        <li function="yh-function-easeOut">低速结束</li>
                    </ul>
                </div>
                <div class="yh-count" @mouseenter.stop.prevent="showCount" @mouseleave.stop.prevent="hideCount">
                    <h3 class="yh-ctitle">次数</h3>
                    <ul class="yh-ccontent" @click.stop.prevent="addCount">
                        <li count="yh-count-1">1次</li>
                        <li count="yh-count-2">2次</li>
                        <li count="yh-count-3">3次</li>
                        <li count="yh-count-4">4次</li>
                        <li count="yh-count-5">5次</li>
                        <li count="yh-count-6">6次</li>
                        <li count="yh-count-7">7次</li>
                        <li count="yh-count-8">8次</li>
                        <li count="yh-count-9">9次</li>
                        <li count="yh-count-10">10次</li>
                        <li count="yh-count-n">n次</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MW from './bus.js'
    import {mapState} from 'vuex'
    export default {
        data(){
            return {

            }
        },
        methods:{
            addComponents(e){
                let name = e.currentTarget.attributes['yh-module-name'].value
                MW.bus.$emit('addChild',name);  // -> components-content
            },
            savePage(e){
                MW.bus.$emit('savePage');
            },
            previewPage(e){
                MW.bus.$emit('previewPage');
            },
            mouseenterChange(e){
                this.showElement('yh-page-change')
            },
            mouseleaveChange(e){
                this.hideElement('yh-page-change')
            },
            pageAnimation(e){
                var change = e.target.attributes['change'].value;
                MW.bus.$emit('pageAnimation',change)
            },

            showAnimate(e){
                this.showElement('yh-acontent');
            },
            hideAnimate(e){
                this.hideElement('yh-acontent');
            },
            addAnimation(e){
                this.addClass(e,'animation','-animation',/(-animation)/g)
            },

            showDelay(e){
                this.showElement('yh-dcontent');
            },
            hideDelay(e){
                this.hideElement('yh-dcontent');
            },
            addDelay(e){
                this.addClass(e,'delay','',/(yh-delay)/g)
            },

            showDuration(e){
                this.showElement('yh-adcontent');
            },
            hideDuration(e){
                this.hideElement('yh-adcontent');
            },
            addDuration(e){
                this.addClass(e,'duration','',/(yh-duration)/g)
            },

            showFunction(e){
                this.showElement('yh-fcontent');
            },
            hideFunction(e){
                this.hideElement('yh-fcontent');
            },
            addFunction(e){
                this.addClass(e,'function','',/(yh-function)/g)
            },

            showCount(e){
                this.showElement('yh-ccontent');
            },
            hideCount(e){
                this.hideElement('yh-ccontent');
            },
            addCount(e){
                this.addClass(e,'count','',/(yh-count)/g)
            },



            showElement(classname){
                var content = document.getElementsByClassName(classname);
                for(let c = 0; c < content.length; c++){
                    content[c].style.display = 'block';
                }
            },
            hideElement(classname){
                var content = document.getElementsByClassName(classname);
                for(let c = 0; c < content.length; c++){
                    content[c].style.display = 'none';
                }
            },
            addClass(e,attr,name,check){
                let value = e.target.attributes[attr].value
                let elem = document.getElementsByClassName('setting')[0],
                    elemID = elem.id
                let classArray = elem.className.split(' ')
                let classname = ''
                for(let c = 0; c < classArray.length; c++){
                    if(classArray){
                        if( check.test(classArray[c]) ){
                            
                        }else{
                            classname += classArray[c]+' '
                        }
                    }
                }
                classname += (value + name)
                elem.className = classname
                MW.bus.$emit('setClassname',elemID,classname);
            }
        }
    }
</script>
<style>
    @import "./style/components-edit.css";
</style>