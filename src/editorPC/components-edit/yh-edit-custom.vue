<template>
    <div class="yh-custom-edit-layer clearfix" :ref="elem_id+'-yh-custom-edit-layer'">
        <yh-edit-tab 
            :props="tabOptions"
            @changeTab="changeTab">
            <div :slot="setContentSlot('css')" class="yh-edit-css clearfix">
                <div v-for="one in css" :is="setModule(one)" 
                    v-if="one.type != 'none'" 
                    v-show="!one.condition || (one.condition && one.status)"
                    :parent="css"
                    :options="one"
                    :elem_id="elem_id">
                </div>
            </div>
            <div :slot="setContentSlot('h5css')" class="yh-edit-h5css clearfix">
                <div v-for="one in h5css" :is="setModule(one)" 
                    v-if="one.type != 'none'" 
                    v-show="!one.condition || (one.condition && one.status)"
                    :parent="h5css"
                    :options="one"
                    :elem_id="elem_id">
                </div>
            </div>
            <div :slot="setContentSlot('data')" class="yh-edit-data clearfix">
                <div v-for="one in owndata" :is="setModule(one)" 
                    v-if="one.type != 'none'" 
                    v-show="!one.condition || (one.condition && one.status)"
                    :parent="owndata"
                    :options="one"
                    :elem_id="elem_id">
                </div>
            </div>
        </yh-edit-tab>
    </div>
</template>
<script>
    import YHEditTab from './yh-edit-tab'
    import YHEditColor from './yh-edit-color'
    import YHEditImage from './yh-edit-image'
    import YHEditNumber from './yh-edit-number'
    import YHEditOptions from './yh-edit-options'
    // import YHEditShadow from './yh-edit-shadow'
    export default {
        components:{
            'yh-edit-tab':YHEditTab,
            'yh-edit-color':YHEditColor,
            'yh-edit-image':YHEditImage,
            'yh-edit-number':YHEditNumber,
            'yh-edit-options':YHEditOptions,
            // 'yh-edit-shadow':YHEditShadow
        },
        props:[
            'css',
            'h5css',
            'elem_id',
            'owndata',
            'custom'  // 如果是'custom'，则设置自定义组件的值
        ],
        data(){
            return {
                yhmodule:{
                    YHEditColor,
                    YHEditImage,
                    YHEditNumber,
                    YHEditOptions,
                    // YHEditShadow
                },
                tabOptions:{
                    backstatus:true,
                    base:{
                        tabs:[{
                            title:'PC样式设置',
                            type:'css'
                        },{
                            title:'移动端样式设置',
                            type:'h5css'
                        },{
                            title:'数据设置',
                            type:'data'
                        }]
                    }
                }
            }
        },
        methods:{
            setModule(one){
                switch(one.type){
                    case 'uplist':
                        return this.yhmodule.YHEditMutiple
                    default:
                        if(one.type){
                            return this.yhmodule['YHEdit'+one.type[0].toLocaleUpperCase()+one.type.slice(1)]
                        }else{
                            return this.yhmodule.YHEditColor
                        }
                }
            },
            setContentSlot(value){
                let i = 0
                for(i = 0; i < this.tabOptions.base.tabs.length; i++){
                    if(this.tabOptions.base.tabs[i].type == value){
                        return 'content'+i
                    }
                }
                return 'content0'
            },
            changeTab(index){
                let tab = this.tabOptions.base.tabs[index]
                if(tab.type == 'css'){
                    this.$store.commit('setActiveStatus','pc')
                }else if(tab.type == 'h5css'){
                    this.$store.commit('setActiveStatus','h5')
                }
            }
        }
    }
</script>
<style lang="scss">
    .yh-custom-edit-layer {
        .yh-edit-tab {
            position: static;
            width: 100%;
            height: 114px;
            overflow: visible;
            background: #101010;
            box-shadow: 0 0 0 #101010;
            .yh-edit-tabTitle > div{
                background: #232323;
                color: #ff0084;
            }
        }
        .yh-edit-h5css > div,
        .yh-edit-data > div,
        .yh-edit-css > div{
            width: 230px;
            float:left;
        }
        .yh-edit-input .yh-edit-text,
        .yh-edit-image .yh-edit-text,
        .yh-edit-options .yh-edit-text,
        .yh-edit-options .yh-edit-value,
        .yh-edit-image .yh-edit-value,
        .yh-edit-input .yh-edit-value input{
            color:#ccc;
        }
        .yh-eidt-combine.yh-edit-input {
            width:82px;
        }
        .yh-eidt-combine.yh-edit-color {
            width:92px;
        }
    }
    
</style>