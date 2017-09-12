<style>
    @import './index.css';
</style>
<template>
    <div class="company-position-style3" :id="props.id" yh-module="CompanyPosition_style3"
        :ref="props.id"
        :industryfield="props.data.industryfield.value"
        :style="{
            backgroundColor:props.css.background_background_color.value,
            boxShadow:'0 0 '+getRem(23)+' 0 '+props.css.shadow_color.value
        }">
        <h3 class="title clearfix">
            <div class="colorBlock">
                <p class="rect rect1 backgroundColor" 
                    :style="{
                        backgroundColor:props.css.line_background_color.value
                    }"></p>
                <p class="rect rect2 backgroundColor" 
                    :style="{
                        backgroundColor:props.css.line_background_color.value
                    }"></p>
            </div>
            <div class="topContent clearfix">
                <div class="tcLeft">
                    <div class="slogan allColor" :style="{
                            color:props.css.all_color.value
                        }">{{props.data.slogan.value}}</div>
                    <div class="description allColor" :style="{
                            color:props.css.all_color.value
                        }" v-html="props.data.description.value"></div>
                </div>
                <div class="tcRight">
                    <a href="javascript:void(0);" 
                        :onclick="'self.location=\'https://www.lagou.com/center/company_'+props.data.companyId.value+'.html\';'" 
                        class="logo" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" 
                        :data-lg-tj-cid="props.data.companyId.value">
                        <img :src="props.data.logo.value" />
                    </a>
                    <a href="javascript:void(0);" 
                        :onclick="'self.location=\'https://www.lagou.com/center/company_'+props.data.companyId.value+'.html\';'" class="name" 
                        :style="{
                            color:props.css.name_color.value
                        }" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" 
                        :data-lg-tj-cid="props.data.companyId.value">
                        {{props.data.name.value}}
                    </a>
                </div>
            </div>
        </h3>
        <div class="bottom">
            <ul class="positionList clearfix">
                <li v-for="(one,index) in props.data.position.value" 
                    :dynamic_type="one.dynamic_type.value">
                    <a href="javascript:void(0);" 
                        :onclick="'self.location=\'https://www.lagou.com/center/job_'+one.positionId.value+'.html\';'" 
                        class="positionUrl clearfix" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" 
                        :data-lg-tj-cid="one.positionId.value">
                        <span class="positionName" 
                            :style="{
                                color:props.css.positionName_color.value}">{{one.positionName.value}}</span>
                        <span class="salary" :style="{
                            color:props.css.salary_color.value}">{{one.salary.value}}</span>
                    </a>
                </li>
            </ul>
            <a href="javascript:void(0);" 
                :onclick="'self.location=\'https://www.lagou.com/center/company_'+props.data.companyId.value+'.html\';'" 
                class="more" target="_blank" data-link="1" data-lg-tj-id="" data-lg-tj-no="" 
                :data-lg-tj-cid="props.data.companyId.value">{{props.data.more.value}}</a>
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
            
        },
        methods:{
            getRem(value){
                return value / (750 / 16)+'rem'
            }
        }
    }
</script>