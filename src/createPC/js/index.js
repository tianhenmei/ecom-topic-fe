import '../css/style.scss'
import Vue from 'vue'

Vue.config.debug = true;//开启错误提示
var pageVue = new Vue({
    el:'#app',
    data(){
        return {
            title:'YH LIST',
            host:'http://localhost:9000',
            href:'/dist/editorPC/index.html',
            chref:'/dist/createPC/index.html',
            total:0,
            eachPage:10,
            currentPage:1,
            totalPage:10,
            one:{
                name:"",  // 专题名称
                activityName:"-------",  // 专题标签
                title:"",  // 专题标题
                url:"",  // 专题URL
                startTime:"",// 活动开始日期
                endTime:"", // 活动结束日期
                keywords:"",  // 专题关键词
                supportH5:1,  // 是否支持H5
                shareTitle:"",  // 分享标题
                shareDesc:"",  // 分享描述
                shareUrl:"",  // 分享链接
                shareImg:"",  // 分享图片
                file:"",
                scripts:'',
                scriptsJson:[],
                lgID:""
            }
        }
    },
    mounted(){
        
    },
    methods:{
        scriptsChange(e){
            let arr = e.target.value.split(/[(\n)(\t)]/g)
            this.one.scriptsJson = arr
        },
        sendData(){
            this.$http.post('http://topic.lagou.com/newEdit/baseStyle',{
                name:this.one.name,
                activityName:this.one.activityName,
                title:this.one.title,
                url:this.one.url,
                startTime:this.one.startTime,
                endTime:this.one.endTime,
                keywords:this.one.keywords,
                lgID:this.one.lgID,
                supportH5:this.one.supportH5,
                shareTitle:this.one.shareTitle,
                shareDesc:this.one.shareDesc,
                shareUrl:this.one.shareUrl,
                shareImg:this.one.shareImg,
                file:this.one.file,
                scriptsJson:this.one.scriptsJson
            },{
                emulateJSON:true
            }).then(response => {
                console.log(response.body.message)
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
                if(!status){
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
                if(!status){
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
                if(!status){
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
			    url = this.one.url,
			    correct = urlPattern.test(url),
                tips = this.$refs[id+'-tips'],
                status = /(hide)/g.test(tips.className),
                self = this
			if (!correct) {
                tips.innerHTML = "* URL格式不正确．请填写类似\"topic.html\""
				if(!status){
                    tips.className = tips.className.replace(/(hide)/g,'').replace(/'  '/g,' ')
                }
				return false;
			}
			if (url.length > 26){
                tips.innerHTML = "* URL过长，请限制在27个字符以内！"
				if(!status){
                    tips.className = tips.className.replace(/(hide)/g,'').replace(/'  '/g,' ')
                }
				return false;
			}
			if(url == curl){
                if(!status){
                    tips.className += ' hide'
                }
				return true;
			}
			
			//checkurl
			this.$http.post("http://topic.lagou.com/template/checkurl", {
                "url":url
            },{
                emulateJSON:true
            }).then(response => {
                let data = response.body
                if(data.success){
                    tips.innerHTML = "* 该URL已存在，请换一个吧，亲！"
					// self.$refs['url'].focus();
				    return data.success;
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
                let data = response.body
                if(data.success){
                    tips.innerHTML = "* 该URL已存在，请换一个吧，亲！"
					// self.$refs['url'].focus();
                    // return data.success;
                    self.one.lgID = data.data.code
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
                {id:'url', callFunction:this.checkurl},
                {id:'activityName',elem:'专题标签',callFunction:this.checkNullOptions},
                {id:'startTime',elem:'活动开始日期',callFunction:this.checkNullTime},
                {id:'endTime',elem:'活动结束日期',callFunction:this.checkNullTime}
            ],
            i = 0,status = false;
            for( ; i < checkArray.length; i++){
                if(checkArray[i].elem){
                    status = checkArray[i].callFunction(id,this.one[id],checkArray[i].elem);
                }else{
                    status = checkArray[i].callFunction(id,this.one[id],checkArray[i].elem)
                }
                if(!status){
                    return;
                }
            }
            if(this.one.lgID){
                this.sendData()
            }else{
                this.getLgID()
            }
        },
        backToHome(e){

        }
    }
})