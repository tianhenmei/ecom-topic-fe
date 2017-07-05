<style>
    @import './index.css';
</style>
<template>
<div class="company-position-style2" :id="props.id" yh-module="CompanyPosition_style2"
    :ref="props.id"
    :industryfield="props.data.industryfield.value"
    :yh-path="path"
    @click.stop="setAll">
    <h3 class="title background clearfix" :style="{'background-color':props.css.background_background_color.value}">
        <a :href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'" class="logoUrl companyLink" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="props.data.companyId.value">
            <img class="logo" :src="props.data.logo.value" />
        </a>
        <div class="right">
            <a :href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'" class="name" :style="{'color':props.css.name_color.value}" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="props.data.companyId.value">
                {{props.data.name.value}}
            </a>
            <p class="tag otherlabel clearfix">
                <span v-for="one in props.data.otherlabel.value.split(/[,.，。]/g)">{{one}}</span>
            </p>
        </div>
    </h3>
    <p class="slogan all" :style="{'color':props.css.all_color.value}">{{props.data.slogan.value}}</p>
    <div class="slideLayer hide">
        <ul class="position positionList background" :style="{'background-color':props.css.background_background_color.value}">
            <li v-for="one in props.data.position.value" :dynamic_type="one.dynamic_type.value">
                <a :href="'https://www.lagou.com/jobs/'+one.positionId.value+'.html'" :lagou-href="'https://www.lagou.com/jobs/'+one.positionId.value+'.html?source=pl&i=pl-0'" class="positionUrl positionLink clearfix" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="one.positionId.value">
                    <p class="positionName" :style="{'color':props.css.positionName_color.value}">{{one.positionName.value}}</p>
                    <p class="salary" :style="{color:props.css.salary_color.value}">{{one.salary.value}}</p>
                </a>
            </li>
        </ul>
        <a :href="'https://www.lagou.com/gongsi/j'+props.data.companyId.value+'.html'" class="more infoWord button background-color" :style="{'background-color':props.css.button_background_color.value,'color':props.css.background_background_color.value}" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="props.data.companyId.value">查看更多热招职位</a>
    </div>
    <!-- yh-edit 组件设置 -->
    <yh-edit-complicated
        ref="yh-edit-complicated"
        :css="props.css"
        :elem_id="props.id"
        :common="props.common"
        :ignorestatus="props.ignorestatus"
        :ischild="props.ischild"
        :owndata="props.data"></yh-edit-complicated>
</div>
</template>
<script>
    import {
        recoveryData,
        getDataID,
        settingBox,
        initSelected,
        updateData,
        setChildData
    } from '../../Base/Node.js'
    import YHEditComplicated from '../../../edit-components/yh-edit-complicated.vue'
    
    const baseData = {
        id:'',
        ignorestatus:'',  // 是否为类似LIST的子集（如果是则会忽略样式设置）为'ignorestatus' 时忽略
        ischild:'',
        yh_data_name:'name',  // 当作为子级时放入uplist中的title取值
        path:'',
        css:{
            background_background_color:{
                cn:'背景颜色',
                en:'background_background_color',
                value:'#0dcba0'
            },
            name_color:{
                cn:'名称颜色',
                en:'name_color',
                value:'#ffffff'
            },
            all_color:{
                cn:'详情颜色',
                en:'all_color',
                value:'#333333'
            },
            positionName_color:{
                cn:'职位颜色',
                en:'positionName_color',
                value:'#ffffff'
            },
            salary_color:{
                cn:'薪资颜色',
                en:'salary_color',
                value:'#ffffff'
            },
            button_background_color:{
                cn:'按钮背景色',
                en:'button_background_color',
                value:'#ffffff'
            }
        },
        common:{

        },
        attribute:{
            
        },
        data:{
            companyId:{
                cn:'公司ID',
                en:'companyId',
                value:147,
                type:'request',
                parent:'data'
            },
            name:{
                cn:'公司名称',
                en:'name',
                value:'拉勾网',
                type:'text',
                parent:'data'
            },
            logo:{
                cn:'公司LOGO',
                en:'logo',
                value:'https://www.lgstatic.com/thumbnail_200x200/i/image/M00/00/1F/Cgp3O1YtkIuAXCPUAAA28p_G-ck324.png',
                type:'image',
                mold:'src',
                parent:'data'
            },
            otherlabel:{
                cn:'公司标签',
                en:'otherlabel',
                value:'节日礼物,股票期权,绩效奖金,年度旅游,领导好,五险一金,午餐补助,弹性工作,吃住全免',
                type:'text',
                parent:'data'
            },
            industryfield:{
                cn:'所属领域',
                en:'industryfield',
                value:'企业服务,招聘',
                type:'text',
                parent:'data'
            },
            slogan:{
                cn:'slogan',
                en:'slogan',
                value:'帮用户找到满意的工作',
                type:'text',
                parent:'data'
            },
            position:{
                cn:'职位设置',
                en:'position',
                type:'uplist',
                name:'positionName',
                parent:'data',
                value:[{
                    dynamic_type:{
                        cn:'职位类别',
                        en:'dynamic_type',
                        value:'设计',
                        type:'none',
                        parent:'data.position.value'
                    },
                    positionId:{
                        cn:'职位ID',
                        en:'positionId',
                        value:'1777398',
                        type:'request',
                        parent:'data.position.value'
                    },
                    positionName:{
                        cn:'职位名称',
                        en:'positionName',
                        value:'UI设计师',
                        type:'text',
                        parent:'data.position.value'
                    },
                    salary:{
                        cn:'职位薪资',
                        en:'salary',
                        value:'7k-12k',
                        type:'text',
                        parent:'data.position.value'
                    }
                },{
                    dynamic_type:{
                        cn:'职位类别',
                        en:'dynamic_type',
                        value:'设计',
                        type:'none',
                        parent:'data.position.value'
                    },
                    positionId:{
                        cn:'职位ID',
                        en:'positionId',
                        value:'1777398',
                        type:'request',
                        parent:'data.position.value'
                    },
                    positionName:{
                        cn:'职位名称',
                        en:'positionName',
                        value:'UI设计师',
                        type:'text',
                        parent:'data.position.value'
                    },
                    salary:{
                        cn:'职位薪资',
                        en:'salary',
                        value:'7k-12k',
                        type:'text',
                        parent:'data.position.value'
                    }
                },{
                    dynamic_type:{
                        cn:'职位类别',
                        en:'dynamic_type',
                        value:'设计',
                        type:'none',
                        parent:'data.position.value'
                    },
                    positionId:{
                        cn:'职位ID',
                        en:'positionId',
                        value:'1777398',
                        type:'request',
                        parent:'data.position.value'
                    },
                    positionName:{
                        cn:'职位名称',
                        en:'positionName',
                        value:'UI设计师',
                        type:'text',
                        parent:'data.position.value'
                    },
                    salary:{
                        cn:'职位薪资',
                        en:'salary',
                        value:'7k-12k',
                        type:'text',
                        parent:'data.position.value'
                    }
                },{
                    dynamic_type:{
                        cn:'职位类别',
                        en:'dynamic_type',
                        value:'设计',
                        type:'none',
                        parent:'data.position.value'
                    },
                    positionId:{
                        cn:'职位ID',
                        en:'positionId',
                        value:'1777398',
                        type:'request',
                        parent:'data.position.value'
                    },
                    positionName:{
                        cn:'职位名称',
                        en:'positionName',
                        value:'UI设计师',
                        type:'text',
                        parent:'data.position.value'
                    },
                    salary:{
                        cn:'职位薪资',
                        en:'salary',
                        value:'7k-12k',
                        type:'text',
                        parent:'data.position.value'
                    }
                }]
            }
        },
        positionData:{
            dynamic_type:{
                cn:'职位类别',
                en:'dynamic_type',
                value:'设计',
                type:'none',
                parent:'data.position.value'
            },
            positionId:{
                cn:'职位ID',
                en:'positionId',
                value:'1777398',
                type:'request',
                parent:'data.position.value'
            },
            positionName:{
                cn:'职位名称',
                en:'positionName',
                value:'UI设计师',
                type:'text',
                parent:'data.position.value'
            },
            salary:{
                cn:'职位薪资',
                en:'salary',
                value:'7k-12k',
                type:'text',
                parent:'data.position.value'
            }
        }
    }

    export default {
        width:315,
        props:['props','path'],
        components:{
            'yh-edit-complicated':YHEditComplicated
        },
        data(){
            return {
                // baseData:JSON.parse(JSON.stringify({
                //     id:baseData.id,
                //     ignorestatus:baseData.ignorestatus,
                //     ischild:baseData.ischild,
                //     yh_data_name:baseData.yh_data_name,
                //     css:baseData.css,
                //     attribute:baseData.attribute,
                //     data:baseData.data,
                //     common:baseData.common
                // }))
            }
        },
        mounted(){
            
        },
        methods:{
            resetData(data){
                return updateData(data,baseData)
            },
            setAll(e){
                let id = initSelected(e)
                this.$refs[id].className += ' setting'
                let yh_edit_layer = this.$refs['yh-edit-complicated'].$refs[id+'-yh-edit-layer']
                yh_edit_layer.className = yh_edit_layer.className.replace(/( hide)/g,'')
                settingBox(this.$refs[id],this.props.ischild)
            },
            recoveryModuleData(elem,baseData){
                let data = {},
                    attr = '',
                    current = null,
                    currentChild = null,
                    i = 0,curr = '',
                    cuArr = [],
                    childdata = {}
                data = JSON.parse(JSON.stringify(baseData.data))
                for(attr in baseData.data){
                    switch(attr){
                        case 'position':
                            current = elem.find('.'+attr).children()
                            data[attr].value = []
                            for(i = 0; i < current.length; i++){
                                childdata = JSON.parse(JSON.stringify(baseData.positionData))
                                for(curr in baseData.positionData){
                                    switch(curr){
                                        case 'dynamic_type':
                                            childdata[curr].value = current.eq(i).attr(curr) ? current.eq(i).attr(curr) : baseData.positionData[curr]
                                            break;
                                        case 'positionId':
                                            currentChild = current.eq(i).find('.positionLink')
                                            childdata[curr].value = getDataID(currentChild.attr('href'),27)
                                            break;
                                        case 'positionName':
                                        case 'salary':
                                            currentChild = current.eq(i).find('.'+curr)
                                            childdata[curr].value = currentChild.length > 0 ? currentChild.html() : baseData.positionData[curr]
                                            break
                                    }
                                }
                                data[attr].value.push(JSON.parse(JSON.stringify(childdata)))
                            }
                            break;
                        case 'companyId':
                            current = elem.find('.companyLink')
                            data[attr].value = getDataID(current.attr('href'),29)
                            break;
                        case 'logo':
                            current = elem.find('.'+attr)
                            data[attr].value = current.length > 0 ? current.attr('src').split('https://www.lgstatic.com/thumbnail_200x200/')[1] : baseData.data[attr]
                            break
                        case 'industryfield':
                            data[attr].value = elem.attr(attr)
                            break;
                        case 'otherlabel':
                            current = elem.find('.'+attr).children()
                            cuArr = []
                            for(i = 0; i < current.length; i++){
                                cuArr.push(current.eq(i).html().trim())
                            }
                            data[attr].value = cuArr.join(',')
                            break;
                        case 'name':
                        case 'city':
                        case 'companySize':
                        case 'financestage':
                        case 'slogan':
                        case 'description':
                        default:
                            current = elem.find('.'+attr)
                            data[attr].value = current.length > 0 ? current.html() : baseData.data[attr]
                            break;
                    }
                }
                return {
                    data:data
                }
            }
        },
        initCtor(options){
            let data = Object.assign(
                {},
                JSON.parse(JSON.stringify({
                    ignorestatus:baseData.ignorestatus,
                    ischild:baseData.ischild,
                    yh_data_name:baseData.yh_data_name,
                    css:baseData.css,
                    attribute:baseData.attribute,
                    data:baseData.data,
                    common:baseData.common
                })),
                options
            )
            return data
        },
        setCtor(options,elemData){
            let data = Object.assign(
                {},
                JSON.parse(JSON.stringify({
                    ignorestatus:baseData.ignorestatus,
                    ischild:baseData.ischild,
                    yh_data_name:baseData.yh_data_name,
                    css:baseData.css,
                    attribute:baseData.attribute,
                    data:setChildData(elemData,baseData.data),
                    common:baseData.common
                })),
                options
            )
            return data
        },
        recoveryCtor(elem,options){
            let data = Object.assign(
                {},
                recoveryData(elem,baseData),
                this.methods.recoveryModuleData(elem,baseData),
                {
                    yh_data_name:baseData.yh_data_name,
                    common:baseData.common
                },
                options
            )
            return data
        }
    }
</script>