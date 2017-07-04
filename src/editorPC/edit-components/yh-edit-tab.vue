<template>
    <div class="yh-edit-tab">
        <div class="clearfix yh-edit-tabTitle">
             <div v-for="(tab,index) in props.base.tabs"
                class="yh-tab-one"
                :class="active == index ? 'yh-tab-active' : ''"
                :index="index"
                @touchstart.stop.prevent="changeTab"
                @mousedown.stop.prevent="changeTab">{{tab.title}}</div>
        </div>
        <div class="yh-edit-tabContent">
            <div v-for="(tab,index) in props.base.tabs"
                :index="index"
                :class="active == index ? 'yh-tab-active' : ''">
                <slot :name="'content'+index"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import {getParentByClassName} from '../components/Base/Node.js'
    export default {
        props:['props'],
        data(){
            return {
                style:{
                    width:200,
                    height:100,
                },
                position:{
                    width:750,
                    left:0,
                    top:0,
                },
                status:true,   // status == true  当前是编辑元素的tab
                active:0   // 当前激活的索引值，默认为0
            }
        },
        methods:{
            getParentByClassName,
            changeTab(e){
                let target =  this.getParentByClassName(e.target,'yh-tab-one'),
                    index = parseInt(target.getAttribute('index'))
                if(index != this.active){
                    this.active = index
                }
            }
        }
    }
</script>
<style>
.yh-edit-tab {
    width:242px;
    height:520px;
    box-shadow:0px 0px 6px #ccc;
    background:#fff;
    position:fixed;
    right:0;
    top:50px;
}
.yh-edit-tab .yh-edit-tabTitle{
    width:100%;
}
.yh-edit-tab .yh-edit-tabTitle > div {
    padding: 0 10px;
    line-height: 26px;
    float:left;
    text-align:center;
    font-size:14px;
    color:#666;
    background:#efefef;
    cursor:pointer;
}
.yh-edit-tab .yh-edit-tabTitle > div:hover,
.yh-edit-tab .yh-edit-tabTitle > div.yh-tab-active{
    background:#ff0084;
    color:#fff;
}

.yh-edit-tab .yh-edit-tabContent > div{
    position: relative;
    display:none;
}
.yh-edit-tab .yh-edit-tabContent > div.yh-tab-active{
    display:block;
}
</style>