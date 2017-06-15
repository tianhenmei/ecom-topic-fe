<template>
    <div class="yh-edit-tab">
        <div class="clearfix yh-edit-tabTitle">
             <div v-for="(tab,index) in props.base.tabs"
                class="yh-tab-one"
                :class="active == index ? 'yh-tab-active' : ''"
                :style="props.style"
                @touchstart.stop.prevent="changeTab"
                @mousedown.stop.prevent="changeTab">{{tab.title}}</div>
        </div>
        <div class="yh-edit-tabContent">
            <div v-for="(tab,index) in props.base.tabs"
                :class="active == index ? 'yh-tab-active' : ''">
                <slot :name="'content'+index"></slot>
            </div>
        </div>
    </div>
</template>
<script>
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
            changeTab(e){
                let target = $(e.target).closest('.yh-tab-one'),
                    index = target.index()

                if(index != this.active){
                    this.active = index
                }
            }
        }
    }
</script>
<style>
.yh-edit-tab {
    width:300px;
    height:200px;
    position:absolute;
    left:0;
    top:0;
    background:#fff;
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