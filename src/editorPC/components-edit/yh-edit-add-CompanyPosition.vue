<template>
    <div class="yh-edit-add-CompanyPosition hide" id="yh-edit-add-CompanyPosition" ref="yh-edit-add-CompanyPosition">
        <div class="title">公司ID</div>
        <textarea placeholder="公司ID:[职位ID,职位ID,职位ID],公司ID:[职位ID,职位ID,职位ID]" ref="yh-edit-add-cptextarea"></textarea>
        <div class="choose clearfix">
            <div class="add" @click.stop.prevent="addEvent">添加</div>
            <div class="undo" @click.stop.prevent="undoEvent">取消</div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {mapState} from 'vuex'
    import {
        setCompanyData,
        setPositionData
    } from '../components/Base/Node.js'
    export default {
        data(){
            return {

            }
        },
        computed:mapState([
            'count',
            'triggerId',
            'triggerClassify',
            'topic',
            'ajaxUrl'
        ]),
        methods:{
            setCompanyPositionData(data,companyPlain){
                let newElement = [],
                    leader = [],
                    one = null,
                    one2 = null,
                    c = 0,l = 0,
                    elementsData = [],
                    id = ''
                for(c = 0; c < companyPlain.length; c++){
                    if(data.companyInfo && data.companyInfo[companyPlain[c]]){
                        id = 'element' + this.count
                        newElement.push(id)
                        one = data.companyInfo[companyPlain[c]]
                        leader = data.leaderInfos[one.id]
                        
                        elementsData.push(setCompanyData(one,leader))
                        elementsData[c].elemID = id
                        for(l = 0; l < data.positionInfos[one.companyId].length; l++){
                            one2 = null
                            one2 = data.positionInfos[one.companyId][l]
                            if(one2){
                                one2.positionFirstType = one2.positionFirstType ? one2.positionFirstType : '技术'
                                if(!elementsData[c].position){
                                    elementsData[c].position = [];
                                }
                                elementsData[c].position.push({});
                                setPositionData(elementsData[c].position[l],one2);
                            }
                        }
                        // this.count++;
                        this.$store.commit('changeCount')
                    }
                }
                //addChildData elementsData
                this.$emit('addChildData',elementsData)
            },
            addEvent(e){
                let parent = this.$refs['yh-edit-add-CompanyPosition'],
                    textarea = this.$refs['yh-edit-add-cptextarea'],
                    value = textarea.value,
                    id = value.replace(/[\s\n]/g,''),
                    companyArray = id.split(']'),
                    companyID = '',
                    company = [],
                    position = [],
                    companyPlain = [],
                    c = 0,
                    p = 0,
                    json = {}
                for ( c = 0; c < companyArray.length; c++ ){
                    if(companyArray[c].trim()){
                        company = companyArray[c].split(':');
                        companyID = company[0].replace(/[\[,、，。.\\|]/g,'');
                        json[companyID] = [];
                        companyPlain.push(companyID)
                        position = company[1] ? company[1].split(/[\[,、，。.\\|]/g) : []
                        for( p = 0; p < position.length; p++){
                            if(position[p].trim()){
                                json[companyID].push(position[p])
                            }
                        }
                    }
                }
                // console.log(json)
                // comAndPosi:JSON.stringify(json).replace(/"/g,'')
                let data = {},
                    name = this.triggerClassify+'s'
                data[this.ajaxUrl[name].param] = JSON.stringify(json).replace(/"/g,'');

                (function(self,companyPlain){
                    //self.topic+self.ajaxUrl[name].url
                    axios.get(self.ajaxUrl[name].url,data)
                        .then(response => {
                            let result = response.data.result
                            self['set'+self.triggerClassify+'Data'](result,companyPlain)
                        },response => {
                            console.log(response.body.message)
                        })
                })(this,companyPlain)
                parent.className = parent.className += ' hide'
            },
            undoEvent(e){
                let parent = this.$refs['yh-edit-add-CompanyPosition']
                parent.className = parent.className += ' hide'
            }
        }
    }
</script>

<style>
.yh-edit-add-CompanyPosition {
    width: 400px;
    height: 230px;
    border: 1px solid #00c99b;
    box-shadow: 0 0 50px #00c99b;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -105px 0 0 -200px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
}
.yh-edit-add-CompanyPosition .title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #02e8b4;
    color: #fff;
    text-align: center;
    font-size:16px;
}
.yh-edit-add-CompanyPosition textarea {
    width: 368px;
    height: 90px;
    padding:5px;
    margin: 10px 10px 0 10px;
    border: 1px solid #ccc;
    resize: none;
}
.yh-edit-add-CompanyPosition .choose{
    width:320px;
    padding:0 0 0 10px;
    margin: 5px auto 0;
}
.yh-edit-add-CompanyPosition .choose > div{
    width:150px;
    height:40px;
    line-height:40px;
    margin:0 10px 0 0;
    background-color:#02e8b4;
    color:#fff;
    text-align:center;
    font-size:16px;
    border-radius:8px;
    float:left;
}
</style>