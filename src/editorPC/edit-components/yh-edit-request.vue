<template>
    <div class="yh-edit-request clearfix">
        <div class="yh-edit-text">{{optionsData.name}}{{optionsData.name ? '：' : ''}}</div>
        <div class="yh-edit-value clearfix">
            <input
                :type="optionsData.type"
                :value="optionsData.style[optionsData.stylename] ? getDesignValue : (optionsData.type == 'number' ? 0 : '')"
            />
            <span @click.stop.prevent="requestEvent">获取</span>
        </div>
        <slot name="chooser"></slot>
    </div>
</template>
<script>
    import {getRequestData} from '../components/Base/Node.js'
    export default {
        props:[
            'eindex',
            'index',
            'parent',
            'options',
            'elem_id',   // 当前被选中元素的ID
            'ischildset',  // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            'ischild'
        ],
        data(){
            return {
                optionsData:{
                    name:this.options.cn,
                    stylename:this.options.en,
                    unit:'',
                    realunit:'',
                    type:'text',
                    classname:'request',
                    style:this.parent,
                    backstatus:false
                },
                changeStatus:false
            }
        },
        computed:{
            getDesignValue(){
                let actualValue = this.optionsData.style[this.optionsData.stylename].value
                return actualValue
            }
        },
        mounted(){
            
        },
        methods:{
            getRequestData,
            requestEvent(e){
                let id = this.optionsData.style[this.optionsData.stylename].value
                this.getRequestData(this.$store,id,this.options.en)
            }
        }
    }
</script>
<style>
    .yh-edit-request {
        width: 100%;
        padding: 0 0 5px 0;
        position:relative;
    }
    .yh-edit-request .yh-edit-text{
        width: 80px;
        height: 25px;
        line-height: 25px;
        float:left;
        text-align:right;
        font-size:12px;
        color:#666;
    }
    .yh-edit-request .yh-edit-value{
        width: 140px;
        padding:0 5px 0 0;
        float:left;
    }
    .yh-edit-request .yh-edit-value input{
        width: 93px;
        height: 23px;
        line-height: 23px;
        border:1px solid #ccc;
        float:left;
        font-size: 12px;
        color: #666;
        background: transparent;
    }
    .yh-edit-request .yh-edit-value span {
        width: 40px;
        height: 25px;
        line-height: 25px;
        margin: 0 0 0 5px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        float: left;
        background: #ff0084;
        cursor:pointer;
    }
</style>