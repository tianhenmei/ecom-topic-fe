import '../css/style.scss'
import Vue from 'vue'
import VueResource from 'vue-resource'
// import axios from 'axios'

Vue.use(VueResource)
Vue.config.debug = true;//开启错误提示
var pageVue = new Vue({
    el:'#app',
    data(){
        return {
            title:'YH LIST',
            host:__isProd__ ? 'http://topic.lagou.com/v3/' : 'http://localhost:9000/v3/',
            editPage:__isProd__ ? 'http://topic.lagou.com/v3/dist/editor/index.html'
                : 'http://localhost:9000/v3/dist/editor/index.html',
            listPage:__isProd__ ? 'http://topic.lagou.com/v3/dist/list/index.html' : 'http://localhost:9000/v3/dist/list/index.html',
            href:'/dist/editorPC/index.html',
            chref:'/dist/create/index.html',
            total:0,
            eachPage:10,
            currentPage:1,
            totalPage:10,
            updateStatus:false,
            oldhtml:'',
            one:{
                templateId:"",
                name:"",  // 专题名称
                templateCategory:"-------",  // 专题标签
                title:"",  // 专题标题
                html:"",  // 专题URL
                activeTimeStart:"",// 活动开始日期
                activeTimeEnd:"", // 活动结束日期
                keywords:"",  // 专题关键词
                supportH5:1,  // 是否支持H5
                shareTitle:"",  // 分享标题
                shareDesc:"",  // 分享描述
                shareUrl:"",  // 分享链接
                shareImg:"",  // 分享图片
                file:"",
                scripts:'',
                scriptsJson:[],
                lgID:"",
                lgH5ID:"",
                createTime:'',
                createAuthor:'gaohui',
                updateTime:'',
                updateAuthor:'gaohui',
            }
        }
    },
    mounted(){
        let name = this.getQueryString('name')
        if(name){
            this.oldhtml = name
            this.getData(name)
        }
    },
    methods:{
        getQueryString(parm){
            var reg = new RegExp("(^|&)" + parm + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);

            if (r != null) return unescape(r[2]); 
            return null;
        },
        scriptsChange(e){
            let arr = e.target.value.split(/[(\n)(\t)]/g)
            this.one.scriptsJson = arr
        },
        getDay(num = 0){
            let now = new Date()
            now.setDate(now.getDate() + num)
            let year = now.getFullYear(),
                month = now.getMonth() + 1,
                day = now.getDate()
            return '0000'.slice((year+'').length)+year+'-'+
                   '00'.slice((month+'').length)+month+'-'+
                   '00'.slice((day+'').length)+day
        },
        getData(html){
            let self = this
            this.$http.post(this.host+'api/create/getPageData',{
                html:html
            },{
                emulateJSON:true
            }).then(response => {
                let data = response.body,
                    arr = ''
                if(data.success){
                    for(arr in self.one){
                        switch(arr){
                            case 'templateId':
                            case 'name':
                            case 'templateCategory':
                            case 'keywords':
                            case 'scriptsJson':
                            case 'file':
                            case 'title':
                            case 'lgID':
                            case 'lgH5ID':
                            case 'createTime':
                            case 'createAuthor':
                                self.one[arr] = (!data.content[arr] || data.content[arr] == 'undefined') ? self.one[arr] : data.content[arr]
                                break
                            case 'activeTimeStart':
                                self.one[arr] = (!data.content[arr] || data.content[arr] == 'undefined') ? self.one[arr] : data.content[arr]
                                if(!self.one[arr]){
                                    self.one[arr] = this.getDay()
                                }
                                break
                            case 'activeTimeEnd':
                                self.one[arr] = (!data.content[arr] || data.content[arr] == 'undefined') ? self.one[arr] : data.content[arr]
                                if(!self.one[arr]){
                                    self.one[arr] = this.getDay(30)
                                }
                                break
                            // case 'supportH5':
                            //     self.one['supportH5'] = (!data.content['share'].status || data.content['share'].status == 'undefined') ? '' : data.content['share'].status
                            //     break
                            case 'shareTitle':
                                self.one['shareTitle'] = (!data.content['share'].title || data.content['share'].title == 'undefined') ? '' : data.content['share'].title
                                break
                            case 'shareDesc':
                                self.one['shareDesc'] = (!data.content['share'].desc || data.content['share'].desc == 'undefined') ? '' : data.content['share'].desc
                                break
                            case 'shareImg':
                                self.one['shareImg'] = (!data.content['share'].pic || data.content['share'].pic == 'undefined') ? '' : data.content['share'].pic
                                break
                            case 'shareUrl':
                                self.one['shareUrl'] = (!data.content['share'].url || data.content['share'].url == 'undefined') ? '' : data.content['share'].url
                                break
                            case 'html':
                                self.one[arr] = data.content[arr] +'.html'
                                self.oldhtml = data.content[arr]
                                break
                            case 'scripts':
                                if(!data.content['scriptsJson'] || data.content['scriptsJson'] == 'undefined'){
                                    self.one[arr] = ''
                                }else{  
                                    self.one[arr] = data.content['scriptsJson'].join('\n')
                                }
                                break
                        }
                    }
                    self.updateStatus = true
                }else{
                    console.log(data.content)
                }
            },response => {
                console.log(response.body.message)
            })
        },
        sendData(){
            let self = this,
                html = this.one.html ? this.one.html.split('.')[0] : 'test'+new Date().getTime(),
                requestUrl = this.updateStatus ? this.host+'api/create/update' 
                    : this.host+'api/create/create',
                data = {
                    name:this.one.name,
                    templateCategory:this.one.templateCategory,
                    title:this.one.title,
                    html:html,
                    oldhtml:this.oldhtml,
                    activeTimeStart:this.one.activeTimeStart,
                    activeTimeEnd:this.one.activeTimeEnd,
                    keywords:this.one.keywords,
                    lgID:this.one.lgID,
                    lgH5ID:this.one.lgH5ID,
                    supportH5:this.one.supportH5,
                    shareTitle:this.one.shareTitle,
                    shareDesc:this.one.shareDesc,
                    shareUrl:this.one.shareUrl,
                    shareImg:this.one.shareImg,
                    file:this.one.file,
                    scriptsJson:this.one.scriptsJson
                }
            if(this.updateStatus){
                data.templateId = this.one.templateId
                data.createTime = this.one.createTime
                data.createAuthor = this.one.createAuthor
            }
            //http://topic.lagou.com/newEdit/baseStyle
            this.$http.post(requestUrl,data,{
                emulateJSON:true
            }).then(response => {
                if(response.body.success){
                    window.location.href = self.editPage+'?name='+html
                }
            },response =>{
                console.log(response.body.message)
            })
        },
        checkNullEvent(e){
            let target = e.target,
                name = target.getAttribute('name'),
                value = target.value
            this.one[name] = value
            this.checkNull(
                target.getAttribute('name'),
                target.value,
                target.getAttribute('cnname')
            )
        },
        checkNull(id,value,name){
            let tips = this.$refs[id+'-tips'],
                status = /(hide)/g.test(tips.className)
            if( !value ){
                tips.innerHTML = "* "+name+"不能为空"
                if(status){
                    tips.className = tips.className.replace(/(hide)/g,'').replace(/'  '/g,' ')
                }
                return false;
            }else{
                if(!status){
                    tips.className += ' hide'
                }
            }
            return true;
        },
        checkNullOptionsEvent(e){
            let target = e.target,
                name = target.getAttribute('name'),
                value = target.value
            this.one[name] = value
            this.checkNullOptions(
                name,
                value,
                target.getAttribute('cnname')
            )
        },
        checkNullOptions(id,value,name){
            let tips = this.$refs[id+'-tips'],
                status = /(hide)/g.test(tips.className)
            if( value == '-------' ){
                tips.innerHTML = "* "+name+"不能为-------"
                if(status){
                    tips.className = tips.className.replace(/(hide)/g,'').replace(/'  '/g,' ')
                }
                return false;
            }else{
                if(!status){
                    tips.className += ' hide'
                }
            }
            return true;
        },
        checkNullTimeEvent(e){
            let target = e.target,
                name = target.getAttribute('name'),
                value = target.value
            this.one[name] = value
            this.checkNullTime(
                target.getAttribute('name'),
                target.value,
                target.getAttribute('cnname')
            )
        },
        checkNullTime(id,value,name){
            let tips = this.$refs[id+'-tips'],
                status = /(hide)/g.test(tips.className)
            if( !value || value == "NaN-aN-aN" ){
                tips.innerHTML = "* "+name+"不能为空"
                if(status){
                    tips.className = tips.className.replace(/(hide)/g,'').replace(/'  '/g,' ')
                }
                return false;
            }else{
                if(!status){
                    tips.className += ' hide'
                }
            }
            return true;
        },
        checkurlEvent(e){
            let target = e.target,
                name = target.getAttribute('name'),
                value = target.value
            this.one[name] = value
            this.checkurl(
                target.getAttribute('name'),
                target.value,
                target.getAttribute('cnname')
            )
        },
        checkurl(id,value,name){
            let urlPattern = /^\w+\.html$/, //形如：　test.html
			    curl = '$!template.url',
			    html = this.one.html,
			    correct = urlPattern.test(html),
                tips = this.$refs[id+'-tips'],
                status = /(hide)/g.test(tips.className),
                self = this
			if (!correct) {
                tips.innerHTML = "* URL格式不正确．请填写类似\"topic.html\""
				if(status){
                    tips.className = tips.className.replace(/(hide)/g,'').replace(/'  '/g,' ')
                }
				return false;
			}
			if (html.length > 26){
                tips.innerHTML = "* URL过长，请限制在27个字符以内！"
				if(status){
                    tips.className = tips.className.replace(/(hide)/g,'').replace(/'  '/g,' ')
                }
				return false;
			}
			if(html == curl){
                if(!status){
                    tips.className += ' hide'
                }
				return true;
			}
			
            //checkurl
            /*,*/
            // http://topic.lagou.com/template/checkurl
            if(this.updateStatus && html.split('.')[0] == this.oldhtml){
                return true
            }
			this.$http.post(this.host+"api/create/checkurl",{
                "url":html.split('.')[0]
            },{
                emulateJSON:true
            })
            .then(response => {
                let data = response.body,
                    urlTips = self.$refs['html-tips']
                if(data.success){
                    tips.innerHTML = "* 该URL已存在，请换一个吧，亲！"
                    urlTips.className = urlTips.className.replace(' hide','')
				    return !data.success;
				}else{
                    urlTips.className += ' hide'
                }
            },response =>{
                console.log(response.body.message)
            })

            if(!status){
                tips.className += ' hide'
            }
			return true;
        },
        getLgID(){
            let self = this
            this.$http.get("http://meta.lagou.com/code/create-jsonp",{
                jsonp:'callback',
                dataType:'jsonp'
            },{
                emulateJSON:true
            }).then(response => {
                // $('.lgID').attr('value',data.data.code);
                // $('#dataForm').submit();
                let data = response.data
                if(data.success){
                    self.one.lgID = data.code
                    self.sendData()
				}
            },response =>{
                alert('meta.lagou.com服务器繁忙，请刷新重试\n如还不行，可联系数据组gim！');
            })
        },
        createSubject(e){
            var checkArray = [
                    {id:'name',elem:'专题名称',callFunction:this.checkNull},
                    {id:'title',elem:'专题标题',callFunction:this.checkNull},
                    {id:'html', callFunction:this.checkurl},
                    {id:'templateCategory',elem:'专题标签',callFunction:this.checkNullOptions},
                    {id:'activeTimeStart',elem:'活动开始日期',callFunction:this.checkNullTime},
                    {id:'activeTimeEnd',elem:'活动结束日期',callFunction:this.checkNullTime}
                ],
                i = 0,status = false,
                id = '';
            for( ; i < checkArray.length; i++){
                id = checkArray[i].id
                if(checkArray[i].elem){
                    status = checkArray[i].callFunction(id,this.one[id],checkArray[i].elem);
                }else{
                    status = checkArray[i].callFunction(id,this.one[id],checkArray[i].elem)
                }
                if(!status){
                    return;
                }
            }
            if(__isProd__){
                if(this.one.lgID){
                    this.sendData()
                }else{
                    this.getLgID()
                }
            }else{
                this.sendData()
            }
        },
        backToHome(e){
            window.location.href = this.listPage
        }
    }
})