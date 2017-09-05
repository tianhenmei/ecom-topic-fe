<template>
    <div class="yh-edit-request clearfix">
        <div class="yh-edit-text">{{options.cn}}{{options.cn ? '：' : ''}}</div>
        <div class="yh-edit-value clearfix">
            <input
                ref="yh-edit-request-input"
                :type="optionsData.type"
                :value="parent[options.en] ? getDesignValue : (optionsData.type == 'number' ? 0 : '')"
            />
            <span @click.stop.prevent="requestEvent">获取</span>
        </div>
        <slot name="chooser"></slot>
    </div>
</template>
<script>
    import axios from 'axios'
    import {getRequestData} from '../components/Base/Node.js'
    export default {
        props:[
            'eindex',
            'index',
            'parent',
            'options',
            'elem_id',   // 当前被选中元素的ID
            'ischildset',  // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            'ischild',
            'path'
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
            requestEvent(e){
                let id = this.$refs['yh-edit-request-input'].value,//this.parent[this.options.en].value,
                    src = this.$store.state.ajaxUrl.CompanyPosition.url,//this.$store.state.companyHost,
                    method = this.$store.state.ajaxUrl.CompanyPosition.type,//'post',
                    commitname = 'setCompanyData',
                    self = this
                switch(this.options.en){
                    case 'companyId':
                        src += id
                        break
                    case 'positionId':
                        src = this.$store.state.ajaxUrl.Position.url + id
                        method = this.$store.state.ajaxUrl.Position.type//'get'
                        commitname = 'setPositionData'
                        break
                }
                // this.connhost+'v3/api/editorPC/getPageData'
                axios({
                    method: method,
                    url: src,
                    // data: {
                    // }
                }).then(response => {
                    let result = response.data.result
                    if(result.hasOwnProperty('logo')){
                        if(result.logo.indexOf('http') == -1 ){
                            if(result.logo.indexOf('i/image/') != -1 || result.logo.indexOf('image1/') != -1 || result.logo.indexOf('image2/') != -1){
                                result.logo = 'https://www.lgstatic.com/thumbnail_200x200/'+result.logo;
                            }else{
                                result.logo = 'https://www.lgstatic.com/'+result.logo;
                            }
                        }else{
                            result.logo = ''+result.logo;
                        }
                    }
                    self.$store.commit(commitname,{
                        parent:self.options.parent ? self.options.parent : 'data',
                        eindex:!(self.eindex == -1 || self.eindex == undefined || typeof self.eindex == 'string') ? self.eindex : -1,
                        index:!(self.index == -1 || self.index == undefined || typeof self.index == 'string') ? self.index : -1,
                        ischildset:self.ischildset ? self.ischildset : '',
                        path:self.path,
                        result:result
                    })
                },response => {
                    console.log(response.body.message)
                })
                // getRequestData(this.$store,id,this.options.en)
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