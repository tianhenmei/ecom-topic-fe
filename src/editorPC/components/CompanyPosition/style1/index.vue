<style>
    /* @import 'http://localhost:9000/dist/editorPC/components/CompanyPosition_style1.css';
    */
    @import './index.css';
</style>
<template>
    <div class="company-position-style1" :id="props.id" yh-module="CompanyPosition_style1"
        :ref="props.id"
        @click.stop="setAll"
        :industryfield="props.data.industryfield.value">
        <div class="leftDiv background" :style="{'background-color':props.css.background_background_color.value}">
            <h3 class="title">
                <a :href="'https://www.lagou.com/gongsi/'+props.data.companyId.value+'.html'" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="props.data.companyId.value" class="nameTop companyLink" target="_blank">
                    <img class="logo" :src="props.data.logo.value" />
                    <p class="name" :style="{'color':props.css.name_color.value}">{{props.data.name.value}}</p>
                </a>
            </h3>
            <div class="infoWord button" :style="{'color':props.css.button_color.value,'background-color':props.css.button_background_color.value}">
                <a :href="'https://www.lagou.com/gongsi/j'+props.data.companyId.value+'.html'" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="props.data.companyId.value" class="more" target="_blank">
                    <span class="background-color button" :style="{'background-color':props.css.button_background_color.value,'color':props.css.button_color.value}">更多职位 ></span>
                </a>
            </div>
        </div>
        <div class="rightDiv">
            <div class="slogan all" :style="{'color':props.css.all_color.value}">{{props.data.slogan.value}}</div>
            <ul class="position positionList clearfix">
                <li v-for="one in props.data.position.value" :dynamic_type="one.dynamic_type.value">
                    <a :href="'https://www.lagou.com/jobs/'+one.positionId.value+'.html'" :lagou-href="'https://www.lagou.com/jobs/'+one.positionId.value+'.html?source=pl&i=pl-0'" class="positionUrl positionLink clearfix" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="one.positionId.value">
                        <p class="positionName" :style="{'color':props.css.positionName_color.value}">{{one.positionName.value}}</p>
                        <p class="salary" :style="{'color':props.css.salary_color.value}">{{one.salary.value}}</p>
                    </a>
                </li>
            </ul>
        </div>
        <!-- yh-edit 组件设置 -->
        <yh-edit-complicated
            ref="yh-edit-complicated"
            :css="props.css"
            :elem_id="props.id"
            :common="props.common"
            :ignorestatus="props.ignorestatus"
            :ischild="props.ischild"
            :owndata="props.data"
            :path="path"
            :parentmodule="parentmodule"></yh-edit-complicated>
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
    import YHEditComplicated from '../../../components-edit/yh-edit-complicated.vue'

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
                value:'#00c99b'
            },
            name_color:{
                cn:'名称颜色',
                en:'name_color',
                value:'#ffffff'
            },
            all_color:{
                cn:'详情颜色',
                en:'all_color',
                value:'#555555'
            },
            positionName_color:{
                cn:'职位颜色',
                en:'positionName_color',
                value:'#00c99b'
            },
            salary_color:{
                cn:'薪资颜色',
                en:'salary_color',
                value:'#00c99b'
            },
            button_color:{
                cn:'按钮文字色',
                en:'button_color',
                value:'#00c99b'
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
            // ischild:{
            //     cn:'是否为子元素',
            //     en:'ischild',
            //     value:'',  // ''   'ischild'
            //     parent:'nonset'
            // }
        },
        data:{
            toH5:{
                cn:'适配移动端',
                en:'toH5',
                value:1,
                type:'checkbox',
                parent:'data'
            },
            toPC:{
                cn:'适配到PC',
                en:'toPC',
                value:1,
                type:'checkbox',
                parent:'data'
            },
            anchorID:{
                cn:'锚点ID',
                en:'anchorID',
                value:'',
                type:'text',
                parent:'data'
            },
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
            // city:{
            //     cn:'所在城市',
            //     en:'city',
            //     value:'北京',
            //     type:'text',
            //     parent:'data'
            // },
            // companySize:{
            //     cn:'公司规模',
            //     en:'companySize',
            //     value:'150-500人',
            //     type:'text',
            //     parent:'data'
            // },
            // financestage:{
            //     cn:'融资阶段',
            //     en:'financestage',
            //     value:'C轮',
            //     type:'text',
            //     parent:'data'
            // },
            industryfield:{
                cn:'所属领域',
                en:'industryfield',
                value:'企业服务,招聘',
                type:'none',
                parent:'data'
            },
            slogan:{
                cn:'slogan',
                en:'slogan',
                value:'帮用户找到满意的工作',
                type:'text',
                parent:'data'
            },
            // description:{
            //     cn:'公司介绍',
            //     en:'description',
            //     value:'<p>拉勾是一家专注于为职场人提供职业成长机会，为中小型企业提供优质的人力资源服务的公司。成长三年、四轮巨额融资、服务千万用户，拉勾已成为互联网垂直招聘行业的佼佼者。</p>↵<p><br /></p>↵<p>拉勾人相信并恪守：无论如何，用户价值都是第一位的；我们绝不因为利益的获取而放下我们一直引以为傲的德行；我们要用最快的方式去践行质感与创新；我们坚信合作是1+1&gt;2；追求主动学习与承担，也就是为了成为我们自己。</p>↵<p><br /></p>↵<p>未来，拉勾人将继续专注于用户体验，精心耕耘两个业务（招聘业务、自由职业者业务）和一个平台（拉勾云平台），不忘初心，专心做好产品，帮助每一位互联网人获得更多更好的职业成长机会、帮助更多的互联网企业获得更轻便更专业的产品服务。</p>',
            //     type:'textarea',
            //     parent:'data'
            // },
            position:{
                cn:'职位设置',
                en:'position',
                type:'uplist',
                name:'positionName',
                parent:'data',
                removeStatus:true,
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
        props:['props','path','parentmodule'],
        components:{
            'yh-edit-complicated':YHEditComplicated
        },
        data(){
            return {
                // baseData:JSON.parse(JSON.stringify({
                //     id:baseData.id,
                //     ignorestatus:baseData.ignorestatus,  // 是否为类似LIST的子集（如果是则会忽略样式设置）
                //     ischild:baseData.ischild,
                //     yh_data_name:baseData.yh_data_name,
                //     path:baseData.path,
                //     css:baseData.css,
                //     common:baseData.common,
                //     attribute:baseData.attribute,
                //     data:baseData.data
                // }))
            }
        },
        create(){
            console.log(this)
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
                    childdata = {}
                data = JSON.parse(JSON.stringify(baseData.data))
                for(attr in baseData.data){
                    switch(attr){
                        case 'companyId':
                            current = elem.find('.companyLink')
                            data[attr].value = getDataID(current.attr('href'),29)
                            break;
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
                        case 'logo':
                            current = elem.find('.'+attr)
                            data[attr].value = current.length > 0 ? current.attr('src').split('https://www.lgstatic.com/thumbnail_200x200/')[1] : baseData.data[attr].value
                            break
                        case 'industryfield':
                            data[attr].value = elem.attr(attr)
                            break;
                        case 'name':
                        case 'city':
                        case 'companySize':
                        case 'financestage':
                        case 'slogan':
                        case 'description':
                        default:
                            current = elem.find('.'+attr)
                            data[attr].value = current.length > 0 ? current.html() : baseData.data[attr].value
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
            data.data.anchorID.value = options.id
            return data
        },
        setCtor(options,elemData){
            let data = Object.assign(
                {},
                JSON.parse(JSON.stringify({
                    ignorestatus:baseData.ignorestatus,
                    ischild:baseData.ischild,
                    yh_data_name:baseData.yh_data_name,
                    path:baseData.path,
                    css:baseData.css,
                    attribute:baseData.attribute,
                    data:setChildData(elemData,baseData.data),
                    common:baseData.common
                })),
                options
            )
            data.data.anchorID.value = options.id
            return data
        },
        recoveryCtor(elem,options){
            let data = Object.assign(
                {},
                recoveryData(elem,baseData),
                this.methods.recoveryModuleData(elem,baseData),
                {
                    common:baseData.common,
                    yh_data_name:baseData.yh_data_name,
                    path:baseData.path
                },
                options
            )
            if(!data.data.anchorID.value){
                data.data.anchorID.value = options.id
            }
            return data
        }
    }
</script>