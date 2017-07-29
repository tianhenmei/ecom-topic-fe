<template>
    <div class="yh-lib clearfix">
        <!-- <ul class="bg clearfix">
            <li class="title">
                <span class="yh-lib-icon"></span> 背景
            </li>
            <li class="content">
                <p class="background_color options clearfix">
                    <span>背景色</span>
                    <input type="text" class="result">
                    <input type="color" class="choose colorBlock">
                </p>
                <p class="background_image options clearfix">
                    <span>背景图</span>
                    <input class="fileupload" value="">
                    <input type="file" class="choose upload" name="file" data-url="/file/upload">
                    <span class="icon"></span>
                </p>
            </li>
        </ul> -->
        <ul class="yh-lib-layout clearfix">
            <li class="content">
                <ul class="clearfix">
                    <li class="li_block yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <p><span class="yh-lib-icon"></span>布局</p>
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title twoTitle">列</p>
                                <ul class="yh-lib-subcomponents">
                                    <li yh-module-name="Block style1" @click.stop.prevent="addComponents">一列</li>
                                    <li yh-module-name="Block style2" @click.stop.prevent="addComponents">两列</li>
                                    <li yh-module-name="Block style3" @click.stop.prevent="addComponents">三列</li>
                                    <li yh-module-name="Block style4" @click.stop.prevent="addComponents">四列</li>
                                </ul>
                            </div>
                            <div class="cpElement clearfix">
                                <p class="title oneTitle">行</p>
                                <ul class="yh-lib-subcomponents">
                                    <li yh-module-name="Row style1" @click.stop.prevent="addComponents">两行</li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li class="li_list yh-lib-parent">
                        <p class="List style1" yh-module-name="List style1" @click.stop.prevent="addComponents">
                            <span class="yh-lib-icon"></span>列表
                        </p>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="yh-lib-element clearfix">
            <li class="content">
                <ul class="clearfix">
                    <li class="li_image yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <span class="yh-lib-icon"></span> 图片
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title twoTitle">图片</p>
                                <ul class="yh-lib-subcomponents">
                                    <li yh-module-name="Image style1" @click.stop.prevent="addComponents" >
                                        头图
                                    </li>
                                    <li id="image_style1" class="imageModule" moduletype="image" @click.stop.prevent="addComponents" >
                                        图片
                                    </li>
                                    <li id="parallax_style1" class="parallaxModule" moduletype="parallax" @click.stop.prevent="addComponents" >
                                        视差图片
                                    </li>
                                    <li id="parallax_style2" class="parallaxModule" moduletype="parallax" @click.stop.prevent="addComponents" >
                                        滑动视差
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li moduletype="position" class="li_position yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <p><span class="yh-lib-icon"></span>职位</p>
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title longTitle">多公司职位</p>
                                <div class="yh-lib-subcomponents-parent">
                                    <ul class="yh-lib-subcomponents">
                                        <li class="CompanyPosition" 
                                            v-for="(one,index) in lib.elements.CompanyPosition"
                                            :yh-module-name="'CompanyPosition '+one.en"
                                            :index="index"
                                            :setListCol="one.col"
                                            @click.stop.prevent="addComponents" 
                                            @mouseenter.stop.prevent="showThumbnail" 
                                            @mouseleave.stop.prevent="hideThumbnail">{{one.cn}}</li>
                                    </ul>
                                </div>
                                <div class="yh-lib-subcomponents-images">
                                    <img 
                                        v-for="(one,index) in lib.elements.CompanyPosition" 
                                        class="hide"
                                        :src="one.src">
                                </div>
                            </div>
                            <div class="cpElement clearfix">
                                <p class="title">单职位</p>
                                <div class="yh-lib-subcomponents-parent">
                                    <ul class="yh-lib-subcomponents clearfix">
                                        <li class="Position" 
                                            v-for="(one,index) in lib.elements.Position"
                                            :yh-module-name="'CompanyPosition '+one.en"
                                            :index="index"
                                            @click.stop.prevent="addComponents"
                                            @mouseenter.stop.prevent="showThumbnail" 
                                            @mouseleave.stop.prevent="hideThumbnail">{{one.cn}}</li>
                                    </ul>
                                </div>
                                <div class="yh-lib-subcomponents-images">
                                    <img 
                                        v-for="(one,index) in lib.elements.Position" 
                                        class="hide"
                                        :src="one.src">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li moduletype="compIntroduce" class="li_company yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <span class="yh-lib-icon"></span> 公司
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title">公司</p>
                                <div class="yh-lib-subcomponents-parent">
                                    <ul class="yh-lib-subcomponents">
                                        <li class="Company"
                                            v-for="(one,index) in lib.elements.Company"
                                            :yh-module-name="'CompanyPosition '+one.en"
                                            :index="index"
                                            @click.stop.prevent="addComponents"
                                            @mouseenter.stop.prevent="showThumbnail" 
                                            @mouseleave.stop.prevent="hideThumbnail">{{one.cn}}</li>
                                    </ul>
                                </div>
                                <div class="yh-lib-subcomponents-images">
                                    <img 
                                        v-for="(one,index) in lib.elements.Company" 
                                        class="hide"
                                        :src="one.src">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li_button yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <span class="yh-lib-icon"></span> 按钮
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title threeTitle">按钮</p>
                                <div class="yh-lib-subcomponents-parent">
                                    <ul class="yh-lib-subcomponents">
                                        <li class="Button"
                                            v-for="(one,index) in lib.elements.Button"
                                            :yh-module-name="'CompanyPosition '+one.en"
                                            :index="index"
                                            @click.stop.prevent="addComponents"
                                            @mouseenter.stop.prevent="showThumbnail" 
                                            @mouseleave.stop.prevent="hideThumbnail">{{one.cn}}</li>
                                    </ul>
                                </div>
                                <div class="yh-lib-subcomponents-images">
                                    <img 
                                        v-for="(one,index) in lib.elements.Button" 
                                        class="hide"
                                        :src="one.src">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li_title yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <span class="yh-lib-icon"></span> 标题
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title threeTitle">标题</p>
                                <div class="yh-lib-subcomponents-parent">
                                    <ul class="yh-lib-subcomponents">
                                        <li class="Title"
                                            v-for="(one,index) in lib.elements.Title"
                                            :yh-module-name="'CompanyPosition '+one.en"
                                            :index="index"
                                            @click.stop.prevent="addComponents"
                                            @mouseenter.stop.prevent="showThumbnail" 
                                            @mouseleave.stop.prevent="hideThumbnail">{{one.cn}}</li>
                                    </ul>
                                </div>
                                <div class="yh-lib-subcomponents-images">
                                    <img 
                                        v-for="(one,index) in lib.elements.Title" 
                                        class="hide"
                                        :src="one.src">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="li_words yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <span class="yh-lib-icon"></span> 文字
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title twoTitle">文字</p>
                                <ul class="yh-lib-subcomponents">
                                    <li class="Words style1" @click.stop.prevent="addComponents">
                                        文字
                                    </li>
                                    <li class="Words style2" @click.stop.prevent="addComponents">
                                        富文本
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li id="carousel_style1" class="carouselModule li_carousel" moduletype="carousel"><span class="yh-lib-icon"></span>轮播</li>
                    <!--<li id="rank_style1" class="rankModule" moduleType="rank"><span class="yh-lib-icon"></span>top榜</li>-->
                    <li class="li_time yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <span class="yh-lib-icon"></span> 时间轴
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title threeThreeTitle"> 时间轴</p>
                                <div class="yh-lib-subcomponents-parent">
                                    <ul class="yh-lib-subcomponents">
                                        <li class="TimeAxis"
                                            v-for="(one,index) in lib.elements.TimeAxis"
                                            :yh-module-name="'CompanyPosition '+one.en"
                                            :index="index"
                                            @click.stop.prevent="addComponents"
                                            @mouseenter.stop.prevent="showThumbnail" 
                                            @mouseleave.stop.prevent="hideThumbnail">{{one.cn}}</li>
                                    </ul>
                                </div>
                                <div class="yh-lib-subcomponents-images">
                                    <img 
                                        v-for="(one,index) in lib.elements.TimeAxis" 
                                        class="hide"
                                        :src="one.src">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <span class="yh-lib-icon"></span> 侧栏
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title longTitle">侧边栏</p>
                                <ul class="yh-lib-subcomponents">
                                    <li class="ScrollView style1" @click.stop.prevent="addComponents">
                                        竖向
                                        <img src="http://topic.lagou.com/static/img/newEdit/scrollView_style1.png">
                                    </li>
                                    <li class="ScrollView style2" @click.stop.prevent="addComponents">
                                        横向
                                        <img src="http://topic.lagou.com/static/img/newEdit/scrollView_style2.png">
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li id="movie_style1" class="li_movie movieModule" moduletype="movie">
                        <span class="yh-lib-icon"></span>视频
                    </li>
                    <li class="yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <span class="yh-lib-icon"></span> 互动
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title">互动</p>
                                <ul class="yh-lib-subcomponents">
                                    <li class="Form style1" @click.stop.prevent="addComponents">
                                        表单
                                        <!--<img src="" />-->
                                    </li>
                                    <li class="Debate style1" @click.stop.prevent="addComponents">
                                        辩论
                                        <!--<img src="http://topic.lagou.com/static/img/newEdit/title_style3.png" />-->
                                    </li>
                                    <li class="Vote style1" @click.stop.prevent="addComponents">
                                        投票
                                        <!--<img src="http://topic.lagou.com/static/img/newEdit/title_style2.png" />-->
                                    </li>
                                    <li class="Thumb style1" @click.stop.prevent="addComponents">
                                        点赞
                                        <!--<img src="http://topic.lagou.com/static/img/newEdit/title_style2.png" />-->
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li class="yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <span class="yh-lib-icon"></span> 其他
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title">对话框</p>
                                <ul class="yh-lib-subcomponents">
                                    <li class="Dialog style1" @click.stop.prevent="addComponents">
                                        样式一
                                        <img src="http://topic.lagou.com/static/img/newEdit/dialog1.png">
                                    </li>
                                    <li class="Dialog style2" @click.stop.prevent="addComponents">
                                        样式二
                                        <img src="http://topic.lagou.com/static/img/newEdit/dialog2.png">
                                    </li>
                                    <li class="Dialog style3" @click.stop.prevent="addComponents">
                                        样式三
                                        <img src="http://topic.lagou.com/static/img/newEdit/dialog3.png">
                                    </li>
                                </ul>
                            </div>
                            <div class="cpElement clearfix">
                                <p class="title" style="padding:0 5px 0;">快报</p>
                                <ul class="yh-lib-subcomponents">
                                    <li class="News style1" @click.stop.prevent="addComponents">
                                        样式一
                                        <img src="http://topic.lagou.com/static/img/newEdit/slideNews-style1.jpg">
                                    </li>
                                </ul>
                            </div>
                            <div class="cpElement clearfix">
                                <p class="title" style="padding:18px 5px 0;">页面</p>
                                <ul class="yh-lib-subcomponents">
                                    <li class="Page style1" @click.stop.prevent="addComponents">
                                        梦想合伙人
                                        <img src="http://topic.lagou.com/static/img/newEdit/page_style1.png">
                                    </li>
                                    <li class="Page style2" @click.stop.prevent="addComponents">
                                        百万CEO
                                        <img src="http://topic.lagou.com/static/img/newEdit/page_style2.png">
                                    </li>
                                    <li class="Page style3" @click.stop.prevent="addComponents">
                                        风暴周
                                        <img src="http://topic.lagou.com/static/img/newEdit/page_style3.jpg">
                                    </li>
                                </ul>
                            </div>
                            <div class="cpElement clearfix">
                                <p class="title oneLessTitle">问题</p>
                                <ul class="yh-lib-subcomponents">
                                    <li id="bug_style1" class="bugModule" moduletype="bug">
                                        1、保存不了
                                    </li>
                                </ul>
                            </div>
                            <div class="cpElement clearfix">
                                <p class="title oneLessTitle">高级</p>
                                <ul class="yh-lib-subcomponents oneLessTitle">
                                    <li id="more_style1" class="moreModule" moduletype="more">
                                        <label class="label"><input type="checkbox"> 去掉头和尾</label>
                                    </li>
                                    <li id="more_style2" class="moreModule" moduletype="more">
                                        <label class="label"><input type="checkbox"> 强制登录</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li class="li_custom yh-lib-parent" @click.stop.prevent="toggleListEvent">
                        <span class="yh-lib-icon"></span> 自定义
                        <div class="yh-lib-components hide">
                            <div class="cpElement clearfix">
                                <p class="title"> 自定义</p>
                                <ul class="yh-lib-subcomponents">

                                </ul>
                            </div>
                            <div id="custom_add" class="custom_add">
                                添加
                            </div>
                        </div>
                    </li>
                    <!--<li><input type="checkbox" id="leftbar">侧边栏</li>-->
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    import {
        getParentByClassName,
        getChildrenByClassName
    } from '../components/Base/Node.js'
    export default {
        data(){
            return {
                lib:{
                    elements:{
                        CompanyPosition:[{
                            en:'style1',
                            cn:'样式一',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition1.png",
                            col:""
                        },{
                            en:'style2',
                            cn:'样式二',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition2.png",
                            col:"setListCol"
                        },{
                            en:'style3',
                            cn:'样式三',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition3.png",
                            col:""
                        },{
                            en:'style4',
                            cn:'样式四',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition4.png",
                            col:"setListCol"
                        },{
                            en:'style5',
                            cn:'样式五',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition5.png",
                            col:"setListCol"
                        },{
                            en:'style6',
                            cn:'样式六',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition6.png",
                            col:""
                        },{
                            en:'style7',
                            cn:'样式七',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition7.png",
                            col:"setListCol"
                        },{
                            en:'style8',
                            cn:'样式八',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition8.png",
                            col:"setListCol"
                        },{
                            en:'style9',
                            cn:'样式九',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition9.png",
                            col:"setListCol"
                        },{
                            en:'style10',
                            cn:'样式十',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition10.png",
                            col:"setListCol"
                        },{
                            en:'style11',
                            cn:'样式十一',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition11.png",
                            col:"setListCol"
                        },{
                            en:'style12',
                            cn:'样式十二',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition12.png",
                            col:"setListCol"
                        },{
                            en:'style13',
                            cn:'样式十三',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition13.png",
                            col:"setListCol"
                        },{
                            en:'style14',
                            cn:'样式十四',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition14.png",
                            col:""
                        },{
                            en:'style15',
                            cn:'样式十五',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition15.png",
                            col:"setListCol"
                        },{
                            en:'style16',
                            cn:'样式十六',
                            src:"http://topic.lagou.com/static/img/newEdit/companyPosition16.png",
                            col:"setListCol"
                        }],
                        Position:[{
                            en:'style1',
                            cn:'样式一',
                            src:'http://topic.lagou.com/static/img/newEdit/position2.png',
                            col:"setListCol"
                        },{
                            en:'style2',
                            cn:'样式二',
                            src:'http://topic.lagou.com/static/img/newEdit/position3.png',
                            col:"setListCol"
                        },{
                            en:'style3',
                            cn:'样式三',
                            src:'http://topic.lagou.com/static/img/newEdit/position4.png',
                            col:"setListCol"
                        }],
                        Company:[{
                            en:'style1',
                            cn:'样式一',
                            src:"http://topic.lagou.com/static/img/newEdit/compIntroduce_style1.png",
                            col:""
                        },{
                            en:'style2',
                            cn:'样式二',
                            src:"http://topic.lagou.com/static/img/newEdit/compIntroduce_style2.png",
                            col:""
                        },{
                            en:'style3',
                            cn:'样式三',
                            src:"http://topic.lagou.com/static/img/newEdit/compIntroduce_style3.png",
                            col:""
                        },{
                            en:'style4',
                            cn:'样式四',
                            src:"http://topic.lagou.com/static/img/newEdit/compIntroduce_style4.png",
                            col:"setListCol"
                        },{
                            en:'style5',
                            cn:'样式五',
                            src:"http://topic.lagou.com/static/img/newEdit/compIntroduce_style5.png",
                            col:""
                        },{
                            en:'style6',
                            cn:'样式六',
                            src:"http://topic.lagou.com/static/img/newEdit/compIntroduce_style6.png",
                            col:""
                        },{
                            en:'style7',
                            cn:'样式七',
                            src:"http://topic.lagou.com/static/img/newEdit/compIntroduce_style7.png",
                            col:"setListCol"
                        },{
                            en:'style8',
                            cn:'样式八',
                            src:"http://topic.lagou.com/static/img/newEdit/compIntroduce_style8.jpg",
                            col:"setListCol"
                        }],
                        Button:[{
                            en:'style1',
                            cn:'样式一',
                            src:"http://topic.lagou.com/static/img/newEdit/btn_style1.png",
                            col:""
                        },{
                            en:'style2',
                            cn:'样式二',
                            src:"http://topic.lagou.com/static/img/newEdit/btn_style2.png",
                            col:""
                        },{
                            en:'style3',
                            cn:'样式三',
                            src:"http://topic.lagou.com/static/img/newEdit/btn_style3.png",
                            col:""
                        }],
                        Title:[{
                            en:'style1',
                            cn:'样式一',
                            src:"http://topic.lagou.com/static/img/newEdit/title_style1.png",
                            col:""
                        },{
                            en:'style2',
                            cn:'样式二',
                            src:"http://topic.lagou.com/static/img/newEdit/title_style2.png",
                            col:""
                        },{
                            en:'style3',
                            cn:'样式三',
                            src:"http://topic.lagou.com/static/img/newEdit/title_style3.png",
                            col:""
                        }],
                        TimeAxis:[{
                            en:'style1',
                            cn:'样式一',
                            src:"http://topic.lagou.com/static/img/newEdit/timeAxis_style1.png",
                            col:""
                        },{
                            en:'style2',
                            cn:'样式二',
                            src:"http://topic.lagou.com/static/img/newEdit/timeAxis_style2.png",
                            col:""
                        },{
                            en:'style3',
                            cn:'样式三',
                            src:"http://topic.lagou.com/static/img/newEdit/timeAxis_style3.png",
                            col:""
                        }]
                    }
                }
            }
        },
        methods:{
            toggleListEvent(e){
                let parent = getParentByClassName(e.target,'yh-lib-parent'),
                    libComponents = document.getElementsByClassName('yh-lib-components'),
                    child = getChildrenByClassName(parent,'yh-lib-components')[0],
                    status = /(hide)/g.test(child.className),
                    i = 0
                for(i = 0; i < libComponents.length; i++){
                    if(!/(hide)/g.test(libComponents[i].className)){
                        libComponents[i].className += ' hide'
                    }
                }
                if(status){
                    child.className = child.className.replace(/(hide)/g,'').replace(/  /g,' ')
                }else {
                    child.className += ' hide'
                }
            },
            showThumbnail(e){
                let index = parseInt(e.target.getAttribute('index')),
                    parent = getParentByClassName(e.target,'cpElement'),
                    children = getChildrenByClassName(parent,'yh-lib-subcomponents-images')[0],
                    child = children.children[index]
                child.className = child.className.replace(/(hide)/g,'').replace(/  /g,' ')   
            },
            hideThumbnail(e){
                let index = parseInt(e.target.getAttribute('index')),
                    parent = getParentByClassName(e.target,'cpElement'),
                    children = getChildrenByClassName(parent,'yh-lib-subcomponents-images')[0],
                    child = children.children[index]
                if(!/(hide)/g.test(child.className)){
                    child.className += ' hide'
                }
            },
            addComponents(e){
                let parent = getParentByClassName(e.target,'yh-lib-parent'),
                    child = getChildrenByClassName(parent,'yh-lib-components')
                if(child && child.length > 0){
                    if(!/(hide)/g.test(child[0].className)){
                        child[0].className += ' hide'
                    }
                }
                this.$emit('addComponents',e)
            }
        }
    }
</script>
<style>
    .yh-lib > ul {
        float: left;
        margin: 0 20px 0 0;
        padding: 12px 0 0 0;
    }
    .yh-lib .yh-lib-icon {
        width: 20px;
        height: 20px;
        margin: 0 10px;
        background: url(http://localhost:9000/static/images/editorPC-icon.png) no-repeat -360px 0;
        background-size: 512px;
        display: block;
    }
    .yh-lib .yh-lib-parent {
        cursor:pointer;
    }
    .yh-lib .yh-lib-components {
        position: absolute;
        left: 0;
        top: 54px;
        width: 151px;
        background: #BCEFDE;
    }
    .yh-lib .yh-lib-components > div {
        border-bottom: 1px solid #ccc;
        width: 100%;
    }
    .yh-lib .yh-lib-components .cpElement {
        position:relative;
    }
    .yh-lib .yh-lib-components > div > p.title {
        width: 20px;
        font-size: 14px;
        float: left;
        padding: 30px 5px 0;
        white-space: normal;
        text-align: center;
    }
    .yh-lib .yh-lib-components > div > p.twoTitle {
        padding: 14px 5px 0;
    }
    .yh-lib .yh-lib-components > div > p.threeTitle {
        padding: 10px 5px 0;
        line-height: 40px;
    }
    .yh-lib .yh-lib-components > div > p.threeThreeTitle {
        padding: 10px 5px 0;
        line-height: 26px;
    }
    .yh-lib .yh-lib-components > div .yh-lib-subcomponents {
        width: 120px;
        background: #E0EFEA;
        float: left;
    }
    .yh-lib .yh-lib-components .yh-lib-subcomponents-parent > .yh-lib-subcomponents{
        width: 105px;
    }
    .yh-lib .yh-lib-subcomponents li {
        height: 32.5px;
        line-height: 32.5px;
        position: relative;
    }
    .yh-lib .yh-lib-subcomponents-parent {
        width: 120px;
        max-height: 300px;
        float: left;
        background: #E0EFEA;
        overflow-y: scroll;
        overflow-x: visible;
    }
    .yh-lib .yh-lib-subcomponents-images img{
        width:300px;
        border: 3px solid #ff0084;
        padding: 5px;
        background-color: #ffd2e9;
        position:absolute;
        left:151px;
        top:0;
    }
    
    .yh-lib .yh-lib-operate > li,
    .yh-lib .yh-lib-layout .content {
        position: relative;
        width: 40px;
        height: 50px;
        line-height: 15px;
        text-align: center;
        color: #666;
        white-space: nowrap;
        font-size: 12px;
        float: left;
    }
    .yh-lib .yh-lib-layout .content {
        width:80px;
    }
    .yh-lib .yh-lib-layout .content > ul > li {
        width:40px;
        float:left;
    }
    .yh-lib-layout li.li_block .yh-lib-icon {
        background-position: -300px 0;
    }
    .yh-lib > .yh-lib-element > li.content, 
    .yh-lib > .yh-lib-element > li.content > ul {
        width: 525px;
    }
    .yh-lib > .yh-lib-element > li.content > ul > li {
        font-size: 12px;
        color: #777;
        float: left;
        position: relative;
    }
    .yh-lib-element li {
        text-align:center;
    }
    .yh-lib-element .content > ul > li.li_image .yh-lib-icon {
        background-position: 0 0;
    }
    .yh-lib-element .content > ul > li.li_position .yh-lib-icon {
        background-position: -60px 0;
    }
    .yh-lib-element .content > ul > li.li_company .yh-lib-icon {
        background-position: -120px 0;
    }
    .yh-lib-element .content > ul > li.li_button .yh-lib-icon {
        background-position: -30px 0;
    }
    .yh-lib-element .content > ul > li.li_title .yh-lib-icon {
        background-position: -150px 0;
    }
    .yh-lib-element .content > ul > li.li_words .yh-lib-icon {
        background-position: -90px 0;
    }
    .yh-lib-element .content > ul > li.li_carousel .yh-lib-icon {
        background-position: -180px 0;
    }
    .yh-lib-element .content > ul > li.li_time .yh-lib-icon {
        background-position: -330px 0;
    }
    .yh-lib-element .content > ul > li.li_movie .yh-lib-icon {
        background-position: -210px 0;
    }
</style>