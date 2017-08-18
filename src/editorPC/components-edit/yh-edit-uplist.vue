<template>
    <div class="yh-uplist-set" v-if="status">
        <div class="yh-uplist-set-title" @click.stop.prevent="toggleUplistContent">
            <span class="icon"></span>
            <span class="name">{{options.name}}</span>
            <span v-if="removeStatus" class="remove"
                @click.stop.prevent="removeElement">x</span>
        </div>
        <div class="yh-uplist-set-content hide">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import {getParentByClassName,getChildrenByClassName,getSiblingsByClassName} from '../components/Base/Node.js'
    export default {
        props:[
            'options',
            'status',  // 是否有子集
            'removeStatus',    // 删除状态
            'index',  //     当前所在父组件的索引
            'parentID', // 父组件ID
            'path' // 父组件路径
        ],
        data(){
            return {
                
            }
        },
        mounted(){
            
        },
        methods:{
            getParentByClassName,
            getChildrenByClassName,
            getSiblingsByClassName,
            toggleUplistContent(e){
                let parent = this.getParentByClassName(e.target,'yh-uplist-set'),
                    siblings = this.getSiblingsByClassName(parent,'yh-uplist-set'),
                    title = this.getParentByClassName(e.target,'yh-uplist-set-title'),
                    content = this.getSiblingsByClassName(title,'yh-uplist-set-content')[0],
                    icon = this.getChildrenByClassName(title,'icon')[0],
                    i = 0,
                    stitle = null,
                    scontent = null,
                    sicon = null,
                    status = /(hide)/g.test(content.className)
                
                for(i = 0; i < siblings.length; i++){
                    stitle = this.getChildrenByClassName(siblings[i],'yh-uplist-set-title')[0]
                    scontent = this.getChildrenByClassName(siblings[i],'yh-uplist-set-content')[0]
                    sicon = this.getChildrenByClassName(stitle,'icon')[0]
                    if(!/(hide)/g.test(scontent.className)){
                        sicon.className = sicon.className.replace('listshow','').replace('  ',' ')
                        scontent.className = scontent.className + ' hide'
                    }
                }
                if(status){
                    if(!/(listshow)/g.test(icon.className)){
                        icon.className = icon.className + ' listshow'
                    }
                    content.className = content.className.replace('hide','').replace('  ',' ')
                }else{
                    icon.className = icon.className.replace('listshow','').replace('  ',' ')
                    content.className = content.className + ' hide'
                }
                
            },
            removeElement(e){
                this.$store.commit('removeElement',{
                    path:this.path+'.props.elements.'+this.index
                })
            }
        }
    }
</script>
<style>
    /*******************
    uplist 样式
    ***********************/
    .yh-uplist-set {
        margin:5px 0;
        background: #fff7fb;
    }
    .yh-uplist-set .yh-uplist-set-title {
        position:relative;
        padding:0 0 0 20px;
        cursor:pointer;
    }
    .yh-uplist-set .yh-uplist-set-title .icon{
        width:0;
        height:0;
        position:absolute;
        left:5px;
        top:2px;
        border-top:7px solid transparent;
        border-bottom:7px solid transparent;
        border-left:7px solid #ff0084;
    }
    .yh-uplist-set .yh-uplist-set-title .listshow{
        border-left:7px solid transparent;
        border-right:7px solid transparent;
        border-top:7px solid #ff0084;
        top:6px;
    }
    .showup{
        -webkit-animation:showup 0.3 both linear;
        animation:showup 0.3 both linear;
    }
    @-webkit-keyframes showup{
        0% {}
        100% {
            -webkit-transform:rotateZ(90deg);
            transform:rotateZ(90deg);
        }
    }
    @keyframes showup{
        0% {}
        100% {
            -webkit-transform:rotateZ(90deg);
            transform:rotateZ(90deg);
        }
    }
    .hidedown{
        -webkit-animation:hidedown 0.3 both linear;
        animation:hidedown 0.3 both linear;
    }
    @-webkit-keyframes hidedown{
        0% {}
        100% {
            -webkit-transform:rotateZ(0deg);
            transform:rotateZ(0deg);
        }
    }
    @keyframes hidedown{
        0% {}
        100% {
            -webkit-transform:rotateZ(0deg);
            transform:rotateZ(0deg);
        }
    }
    .yh-uplist-set .yh-uplist-set-title .name {
        color:#ff0084;
        font-size:14px;
        text-align:left;
    }
    .yh-uplist-set .yh-uplist-set-title .remove {
        display: block;
        width: 14px;
        height: 14px;
        line-height: 14px;
        border: 1px solid #ff0084;
        border-radius: 50%;
        text-align: center;
        font-size: 12px;
        color: #ff0084;
        position: absolute;
        right: 0;
        top: 2.5px;
        cursor:pointer;
    }
</style>