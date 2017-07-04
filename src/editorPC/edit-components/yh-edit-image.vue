<template>
    <div class="yh-edit-image clearfix">
        <div class="yh-edit-text">{{options.cn}}：</div>
        <input type="text" class="yh-edit-value"
            v-model="parent[options.en].value"
            @input="setValue" />
        <div class="yh-edit-image-local">
            <!-- accept="image/*" * 通配符会延迟文件选择器的速度，可将其修改为指定的MIME类型，就可以解决Webkit浏览器下的对话框显示滞慢的问题。 -->
            <input type="file" class="yh-edit-imagefile"
                accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                :stylename="options.en"
                @change.stop="uploadFile" />
        </div>
    </div>
</template>
<script>
    export default {
        props:[
            'eindex',
            'index',
            'parent',
            'options',
            'elem_id',   // 当前被选中元素的ID
            'ischildset',  // 用于判断当前被选中元素是父级，设置项却是子集的设置 默认'' 为真时：'ischildset'
            'ischild'
        ],
        data(){
            return {

            }
        },
        methods:{
            setValue(e){
                let target = e.target,
                    value = target.value,
                    stylename = this.options.en
                switch(this.options.mold){
                    case 'bg':
                        let image = new Image();
                        (function(self,value){
                            image.onload = function(){
                                self.$store.commit('setMultipleValue',[{
                                    parent:self.options.parent ? self.options.parent : 'css',
                                    eindex:!(self.eindex == -1 || self.eindex == undefined || typeof self.eindex == 'string') ? self.eindex : -1,
                                    index:!(self.index == -1 || self.index == undefined || typeof self.index == 'string') ? self.index : -1,
                                    ischildset:self.ischildset ? self.ischildset : '',
                                    stylename:self.options.en,
                                    actualValue:value,
                                    designValue:value
                                },{
                                    parent:'nonset',
                                    eindex:!(self.eindex == -1 || self.eindex == undefined || typeof self.eindex == 'string') ? self.eindex : -1,
                                    index:!(self.index == -1 || self.index == undefined || typeof self.index == 'string') ? self.index : -1,
                                    ischildset:self.ischildset ? self.ischildset : '',
                                    stylename:'min_height',
                                    actualValue:image.height, // / (750 / 16)+'rem',
                                    designValue:image.height
                                }])
                            }
                        })(this,value)
                        image.src = value
                        break
                    default:
                        break;
                }
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
                        url:self.$store.state.host+'editorPC/upload',
                        data:fileData,
                        dataType: 'JSON',  
                        cache: false,  
                        processData: false,  
                        contentType: false,
                        success(data){
                            let name = self.options.mold,
                                stylename = '',
                                value = ''
                            if(self.type){
                                switch(name){
                                    case 'src':
                                        stylename = 'yh-src'
                                        value = self.$store.state.host+data.content.path
                                        break
                                    case 'bg':
                                        stylename = 'background-image'
                                        value = self.$store.state.host+data.content.path
                                        break
                                }
                                self.$store.commit('setValue',{
                                    parent:self.parent,
                                    index:self.index,
                                    ischildset:self.ischildset ? self.ischildset : '',
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
                                        self.setBackgroundImage(self,data.content)
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
                let src = self.$store.state.host+data.path
                self.$store.commit('setMultipleValue',[{
                    parent:this.parent ? this.parent : '',
                    eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset:this.ischildset ? this.ischildset : '',
                    stylename:'audiosrc',
                    actualValue:src,
                    designValue:src
                }])
            },
            imageChange(self,data){
                let elem = document.getElementsByClassName('setting')[0],
                    // yhcontent = self.$root.$children[0].$refs['yh-content'],
                    src = self.$store.state.host+data.path
                // yhcontent.addSettingBox(elem)
                self.$store.commit('setMultipleValue',[{
                    parent:this.options ? this.options.parent : 'style',
                    eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset:this.ischildset ? this.ischildset : '',
                    stylename:'width',
                    actualValue:data.width / (750 / 16)+'rem',
                    designValue:data.width+'px'
                },{
                    parent:this.options ? this.options.parent : 'style',
                    eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string')? this.index : -1,
                    ischildset:this.ischildset ? this.ischildset : '',
                    stylename:'height',
                    actualValue:data.height / (750 / 16)+'rem',
                    designValue:data.height+'px'
                },{
                    parent:this.options ? this.options.parent : '',
                    eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset:this.ischildset ? this.ischildset : '',
                    stylename:'src',
                    actualValue:src,
                    designValue:src
                }])
            },
            setBackgroundImage(self,data){
                let url = self.$store.state.host+data.path

                self.$store.commit('setMultipleValue',[{
                    parent:this.options.parent ? this.options.parent : 'css',
                    eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset:this.ischildset ? this.ischildset : '',
                    stylename:self.options.en,
                    actualValue:url,
                    designValue:url
                },{
                    parent:'nonset',
                    eindex:!(this.eindex == -1 || this.eindex == undefined || typeof this.eindex == 'string') ? this.eindex : -1,
                    index:!(this.index == -1 || this.index == undefined || typeof this.index == 'string') ? this.index : -1,
                    ischildset:this.ischildset ? this.ischildset : '',
                    stylename:'min_height',
                    actualValue:data.height+'px', // / (750 / 16)+'rem',
                    designValue:data.height+'px'
                }])
            },
        }
    }
</script>
<style>
    .yh-edit-image {
        width: 100%;
        padding: 0 0 5px 0;
        position: relative;
    }
    .yh-edit-image .yh-edit-text {
        width: 80px;
        height: 25px;
        line-height: 25px;
        text-align: right;
        font-size: 12px;
        color: #666;
        float:left;
    }
    .yh-edit-image .yh-edit-value {
        width: 113px;
        height: 23px;
        line-height: 23px;
        border: 1px solid #ccc;
        font-size: 12px;
        color: #666;
        background: transparent;
        float:left;
    }
    .yh-edit-image .yh-edit-image-local {
        width: 20px;
        height: 20px;
        background: url(http://localhost:9000/static/images/icons.png) no-repeat -2px -194px;
        position:absolute;
        left:200px;
        top:3px;
    }
    .yh-edit-image .yh-edit-imagefile{
        width: 20px;
        height: 20px;
        border: none;
        opacity:0;
        display: block;
    }
</style>