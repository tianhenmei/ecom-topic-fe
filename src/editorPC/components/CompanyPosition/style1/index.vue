<style>
    /* @import 'http://localhost:9000/dist/editorPC/components/CompanyPosition_style1.css';
    */
    @import './index.css';
</style>
<template>
    <div class="company-position-style1" :id="props.id" yh-module="CompanyPosition_style1"
        :ref="props.id"
        @click.stop.prevent="setAll"
        :industryfield="props.data.industryfield">
        <div class="leftDiv background" :style="{'background-color':props.css.background_background_color.value}">
            <h3 class="title">
                <a :href="'https://www.lagou.com/gongsi/'+props.data.companyId+'.html'" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="props.data.companyId" class="nameTop companyLink" target="_blank">
                    <img class="logo" :src="'https://www.lgstatic.com/thumbnail_200x200/'+props.data.logo" />
                    <p class="name" :style="{'color':props.css.name_color.value}">{{props.data.name}}</p>
                </a>
            </h3>
            <div class="infoWord button" :style="{'color':props.css.button_color.value,'background-color':props.css.button_background_color.value}">
                <a :href="'https://www.lagou.com/gongsi/j'+props.data.companyId+'.html'" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="props.data.companyId" class="more" target="_blank">
                    <span class="background-color button" :style="{'background-color':props.css.button_background_color.value,'color':props.css.button_color.value}">更多职位 ></span>
                </a>
            </div>
        </div>
        <div class="rightDiv">
            <div class="slogan all" :style="{'color':props.css.all_color.value}">{{props.data.slogan}}</div>
            <ul class="position positionList clearfix">
                <li v-for="one in props.data.position" :dynamic_type="one.dynamic_type">
                    <a :href="'https://www.lagou.com/jobs/'+one.positionId+'.html'" :lagou-href="'https://www.lagou.com/jobs/'+one.positionId+'.html?source=pl&i=pl-0'" class="positionUrl positionLink clearfix" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="one.positionId">
                        <p class="positionName" :style="{'color':props.css.positionName_color.value}">{{one.positionName}}</p>
                        <p class="salary" :style="{'color':props.css.salary_color.value}">{{one.salary}}</p>
                    </a>
                </li>
            </ul>
        </div>
        <!-- yh-edit 组件设置 -->
        <yh-edit-complicated
            ref="yh-edit-complicated"
            :css="props.css"
            :parent_id="props.id"
            :common="props.common"
            :owndata="props.data"></yh-edit-complicated>
    </div>
</template>
<script>
    import {recoveryData,getDataID,settingBox} from '../../Base/Node.js'
    import YHEditComplicated from '../../../edit-components/yh-edit-complicated.vue'

    const baseData = {
        id:'',
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

        },
        data:{
            name:'拉勾网',
            companyId:147,
            logo:'i/image/M00/00/1F/Cgp3O1YtkIuAXCPUAAA28p_G-ck324.png',
            city:'北京',
            companySize:'150-500人',
            financestage:'C轮',
            industryfield:'企业服务,招聘',
            slogan:'帮用户找到满意的工作',
            description:'<p>拉勾是一家专注于为职场人提供职业成长机会，为中小型企业提供优质的人力资源服务的公司。成长三年、四轮巨额融资、服务千万用户，拉勾已成为互联网垂直招聘行业的佼佼者。</p>↵<p><br /></p>↵<p>拉勾人相信并恪守：无论如何，用户价值都是第一位的；我们绝不因为利益的获取而放下我们一直引以为傲的德行；我们要用最快的方式去践行质感与创新；我们坚信合作是1+1&gt;2；追求主动学习与承担，也就是为了成为我们自己。</p>↵<p><br /></p>↵<p>未来，拉勾人将继续专注于用户体验，精心耕耘两个业务（招聘业务、自由职业者业务）和一个平台（拉勾云平台），不忘初心，专心做好产品，帮助每一位互联网人获得更多更好的职业成长机会、帮助更多的互联网企业获得更轻便更专业的产品服务。</p>',
            position:[{
                dynamic_type:'设计',
                positionId:'1777398',
                positionName:'UI设计师',
                salary:'7k-12k'
            },{
                dynamic_type:'设计',
                positionId:'1777398',
                positionName:'UI设计师',
                salary:'7k-12k'
            },{
                dynamic_type:'设计',
                positionId:'1777398',
                positionName:'UI设计师',
                salary:'7k-12k'
            },{
                dynamic_type:'设计',
                positionId:'1777398',
                positionName:'UI设计师',
                salary:'7k-12k'
            }]
        },
        positionData:{
            dynamic_type:'设计',
            positionId:'1777398',
            positionName:'UI设计师',
            salary:'7k-12k'
        }
    }
    export default {
        props:['props'],
        components:{
            'yh-edit-complicated':YHEditComplicated
        },
        data(){
            return {
                baseData:JSON.parse(JSON.stringify({
                    id:baseData.id,
                    css:baseData.css,
                    attribute:baseData.attribute,
                    data:baseData.data,
                    common:baseData.common
                }))
            }
        },
        mounted(){
            
        },
        methods:{
            recoveryData,
            getDataID,
            settingBox,
            setAll(e){
                let i = 0,
                    id = ''
                for(i = 0; i < e.path.length; i++){
                    if(e.path[i].id){
                        id = e.path[i].id
                        break
                    }
                }
                $('.setting').removeClass('setting')
                $('.yh-edit-layer').addClass('hide')
                this.$refs[id].className += ' setting'
                let yh_edit_layer = this.$refs['yh-edit-complicated'].$refs[id+'-yh-edit-layer']
                yh_edit_layer.className = yh_edit_layer.className.replace(/( hide)/g,'')
                this.settingBox(this.$refs[id])
            },
            recoveryModuleData(elem,baseData){
                let data = {},
                    attr = '',
                    current = null,
                    currentChild = null,
                    i = 0,curr = '',
                    childdata = {}
                for(attr in baseData.data){
                    switch(attr){
                        case 'position':
                            current = elem.find('.'+attr).children()
                            data[attr] = []
                            for(i = 0; i < current.length; i++){
                                childdata = {}
                                for(curr in baseData.positionData){
                                    switch(curr){
                                        case 'dynamic_type':
                                            childdata[curr] = current.eq(i).attr(curr) ? current.eq(i).attr(curr) : baseData.positionData[curr]
                                            break;
                                        case 'positionId':
                                            currentChild = current.eq(i).find('.positionLink')
                                            childdata[curr] = this.getDataID(currentChild.attr('href'),27)
                                            break;
                                        case 'positionName':
                                        case 'salary':
                                            currentChild = current.eq(i).find('.'+curr)
                                            childdata[curr] = currentChild.length > 0 ? currentChild.html() : baseData.positionData[curr]
                                            break
                                    }
                                }
                                data[attr].push(JSON.parse(JSON.stringify(childdata)))
                            }
                            break;
                        case 'companyId':
                            current = elem.find('.companyLink')
                            data[attr] = this.getDataID(current.attr('href'),29)
                            break;
                        case 'logo':
                            current = elem.find('.'+attr)
                            data[attr] = current.length > 0 ? current.attr('src').split('https://www.lgstatic.com/thumbnail_200x200/')[1] : baseData.data[attr]
                            break
                        case 'industryfield':
                            data[attr] = elem.attr(attr)
                            break;
                        case 'name':
                        case 'city':
                        case 'companySize':
                        case 'financestage':
                        case 'slogan':
                        case 'description':
                        default:
                            current = elem.find('.'+attr)
                            data[attr] = current.length > 0 ? current.html() : baseData.data[attr]
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
                    css:baseData.css,
                    attribute:baseData.attribute,
                    data:baseData.data,
                    common:baseData.common
                })),
                options
            )
            return data
        },
        recoveryCtor(elem,options){
            let data = Object.assign(
                {},
                this.methods.recoveryData(elem,baseData),
                this.methods.recoveryModuleData(elem,baseData),
                {
                    common:baseData.common
                },
                options
            )
            return data
        }
    }
</script>