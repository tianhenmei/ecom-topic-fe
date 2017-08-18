<style>
    @import './index.css';
</style>
<template>
    <div class="company-position-style3" :id="props.id" yh-module="CompanyPosition_style3"
        :ref="props.id"
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
    </div>
</template>
<script>
    export default {
        props:['props','path','parentmodule'],
        data(){
            return {
                
            }
        },
        create(){
            
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>