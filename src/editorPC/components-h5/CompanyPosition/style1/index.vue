<style>
    @import './index.css';
</style>
<template>
    <div class="company-position-style1" :id="props.id" yh-module="CompanyPosition_style1"
        :ref="props.id"
        :industryfield="props.data.industryfield.value">
        <div class="title backgroundColor clearfix" :style="{'background-color':props.css.background_background_color.value}">
            <div class="titleBG blur" :style="{'background-image':'url('+props.data.logo.value+')'}"></div>
            <a href="javascript:void(0);" :onclick="'self.location=&quot;https://www.lagou.com/center/company_'+props.data.companyId.value+'.html&quot;'" class="logo" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="props.data.companyId.value">
                <img :src="props.data.logo.value" />
            </a>
            <a href="javascript:void(0);" :onclick="'self.location=&quot;https://www.lagou.com/center/company_'+props.data.companyId.value+'.html&quot;'" class="name" :style="{'color':props.css.name_color.value}" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="props.data.companyId.value">
                {{props.data.name.value}}
            </a>
        </div>
        <ul class="positionList clearfix">
            <li v-for="one in props.data.position.value" :dynamic_type="one.dynamic_type.value">
                <a href="javascript:void(0);" :onclick="'self.location=&quot;https://www.lagou.com/center/job_'+one.positionId.value+'.html&quot;'" class="positionUrl clearfix" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="one.positionId.value">
                    <p class="positionName" :style="{'color':props.css.background_background_color.value}">{{one.positionName.value}}</p>
                    <p class="salary" :style="{'color':props.css.background_background_color.value}">{{one.salary.value}}</p>
                </a>
            </li>
            <li class="moreLi">
                <a  class="more" href="javascript:void(0);" :onclick="'self.location=&quot;https://www.lagou.com/center/company_'+props.data.companyId.value+'.html&quot;'" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" :data-lg-tj-cid="props.data.companyId.value">
                    查看全部职位
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props:['props','path','parentmodule'],
        data(){
            return {
                
            }
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>