<template>
    <div class="yh-edit-options yh-edit-image clearfix" :class="online ? online.classname :''">
        <div v-if="online" class="yh-edit-image-online clearfix">
            <div class="yh-edit-text">{{online.name}}{{online.name ? ': ' : ''}}</div>
            <input type="text"
                :stylename="online.stylename"
                :parent="online.parent"
                :value="online.style[online.stylename]"
                :index="online.index"
                @input="setValue" />
        </div>
        <input type="file" content="background-image" accept="image/*" 
            :mold="options.mold" 
            @change="uploadFile" />
    </div>
</template>
<script>
    import MW from '../components/bus.js'
    export default {
        props:['options','type','online'],
        data(){
            return {

            }
        },
        methods:{
            setValue(e){
                let target = e.target,
                    value = target.value,
                    stylename = target.attributes['stylename'].value,
                    parent = target.attributes['parent'].value,
                    index = target.attributes['index'] ? parseInt(target.attributes['index'].value) : -1
                
                this.$store.commit('setValue',{
                    parent:parent,
                    index:index,
                    stylename:stylename,
                    actualValue:value,
                    designValue:value
                })
            },
            uploadFile(e){
                let that = e.target,
                    file = that.files[0],
                    fileData = new FormData(),
                    self = this
                fileData.append('files',file,file.name);
                (function(self,that){
                    $.ajax({
                        type:'post',
                        url:MW.host+'editor/upload',
                        data:fileData,
                        dataType: 'JSON',  
                        cache: false,  
                        processData: false,  
                        contentType: false,
                        success(data){
                            let name = that.attributes['mold'].value,
                                stylename = '',
                                value = ''
                            if(self.type){
                                switch(name){
                                    case 'src':
                                        stylename = 'yh-src'
                                        value = MW.host+data.content.path
                                        break
                                    case 'bg':
                                        stylename = 'background-image'
                                        value = "url("+MW.host+data.content.path+")"
                                        break
                                }
                                self.$store.commit('setValue',{
                                    parent:self.type.parent,
                                    index:self.type.index,
                                    stylename:stylename,
                                    actualValue:value,
                                    designValue:value
                                })
                            }else{
                                switch(name){
                                    case 'src':
                                        self.imageChange(self,data.content)
                                        break
                                    case 'audiosrc':
                                        self.otherChange(self,data.content)
                                        break    
                                    case 'bg':
                                        self.setBackgroundImage(self,data.content,'yh-button')
                                        break
                                }
                            }
                        },
                        error(error){
                            console.log(error.message);
                        }
                    });
                })(self,that)
            },
            otherChange(self,data){
                let src = MW.host+data.path
                self.$store.commit('setMultipleValue',[{
                    parent:this.type ? this.type.parent : '',
                    index:this.type ? this.type.index : -1,
                    stylename:'audiosrc',
                    actualValue:src,
                    designValue:src
                }])
            },
            imageChange(self,data){
                let elem = $('.setting'),
                    yhcontent = self.$root.$children[0].$refs['yh-content'],
                    src = MW.host+data.path
                yhcontent.addSettingBox(elem)
                self.$store.commit('setMultipleValue',[{
                    parent:this.type ? this.type.parent : 'style',
                    index:this.type ? this.type.index : -1,
                    stylename:'width',
                    actualValue:data.width / (750 / 16)+'rem',
                    designValue:data.width+'px'
                },{
                    parent:this.type ? this.type.parent : 'style',
                    index:this.type ? this.type.index : -1,
                    stylename:'height',
                    actualValue:data.height / (750 / 16)+'rem',
                    designValue:data.height+'px'
                },{
                    parent:this.type ? this.type.parent : '',
                    index:this.type ? this.type.index : -1,
                    stylename:'src',
                    actualValue:src,
                    designValue:src
                }])
            },
            setBackgroundImage(self,data,childName){
                let elem = $('.setting'),
                    url = "url("+MW.host+data.path+")",
                    yhcontent = self.$root.$children[0].$refs['yh-content']

                yhcontent.addSettingBox(elem)
                self.$store.commit('setMultipleValue',[{
                    parent:this.type ? this.type.parent : 'style',
                    index:this.type ? this.type.index : -1,
                    stylename:'backgroundImage',
                    actualValue:url,
                    designValue:url
                },{
                    parent:this.type ? this.type.parent : 'style',
                    index:this.type ? this.type.index : -1,
                    stylename:'backgroundSize',
                    actualValue:'100% 100%',
                    designValue:'100% 100%'
                },{
                    parent:this.type ? this.type.parent : 'style',
                    index:this.type ? this.type.index : -1,
                    stylename:'width',
                    actualValue:data.width / (750 / 16)+'rem',
                    designValue:data.width+'px'
                },{
                    parent:this.type ? this.type.parent : 'style',
                    index:this.type ? this.type.index : -1,
                    stylename:'height',
                    actualValue:data.height / (750 / 16)+'rem',
                    designValue:data.height+'px'
                }])
            },
        }
    }
</script>
<style>
    .yh-edit-image {
        width: 20px;
        height: 20px;
        background: url(http://localhost:9000/static/images/icons.png) no-repeat -2px -194px;
    }
    .yh-edit-image input{
        width:20px;
        height:20px;
        display:block;
        opacity:0;
    }
    .yh-edit-online{
        width:275px;   
        background-position:253px -194px;
    }
    .yh-edit-online .yh-edit-image-online{
        width:255px;   
        float:left;
    }
    .yh-edit-online .yh-edit-image-online .yh-edit-text{
        width: 55px;
        font-size: 12px;
        color: #666;
        float:left;
    }
    .yh-edit-online .yh-edit-image-online input {
        width: 190px;
        height: 18px;
        line-height: 18px;
        float: left;
        opacity:1;
    }
    .yh-edit-online > input {
        float:left;
    }
</style>