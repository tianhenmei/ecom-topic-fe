<style>
    @import './index.css';
</style>
<template>
<div class="company-position-style2" :id="props.id" yh-module="CompanyPosition_style2"
    :ref="props.id"
    :industryfield="props.data.industryfield.value"
    :yh-path="path">
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
</div>
</template>
<script>
    export default {
        width:315,
        props:['props','path','parentmodule'],
        data(){
            return {
                
            }
        },
        mounted(){
            
        }
    }
</script>