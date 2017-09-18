import '../css/style.scss'
import Vue from 'vue'

Vue.config.debug = true;//开启错误提示
var pageVue = new Vue({
    el:'#app',
    data(){
        return {
            title:'YH LIST',
            // 图片或接口访问host
            host:__isProd__ ? 'http://topic.lagou.com/v3/' : 'http://localhost:9000/v3/',
            // 页面访问host
            pageHost:__isProd__ ? 'https://activity.lagou.com/topic/v3/' : 'http://localhost:9000/v3/',
            href:'dist/createPC/index.html',
            chref:'dist/create/index.html',
            total:0,
            eachPage:10,
            currentPage:1,
            totalPage:10,
            list:[{
                activeTimeEnd:"",
                activeTimeStart:"",
                createAuthor:"gaohui",
                createTime:"2017/06/19 15:26",
                description:"YH EDITOR PC TEST",
                html:"text",
                share:{status: false, title: "", desc: "", pic: ""},
                templateCategory:"测试",
                templateId:"10001",
                templateType:"PC",
                title:"YH EDITOR PC",
                updateAuthor:"gaohui",
                updateTime:"2017/07/02 22:31:27"
            }]
        }
    },
    mounted(){
        this.getListData()
    },
    methods:{
        getListData(){
            let self = this
            $.ajax({
                type:'post',
                url:this.host+'api/list/getListData',
                data:{
                    page:this.currentPage,
                    eachPage:this.eachPage
                },
                success:function(data){
                    let result = data.result

                    self.list = result.list
                    self.total = result.total
                    self.totalPage = result.totalPage
                },
                error:function(error){
                    console.log(error.message)
                }
            })
        },
        showPreList(e){
            if(this.currentPage > 1){
                this.currentPage -= 1
                this.getListData()
            }
        },
        showNextList(e){
            if(this.currentPage < this.totalPage){
                this.currentPage += 1
                this.getListData()
            }
        },
        showPointList(e){
            let number = parseInt(this.$refs['point-number'].value)
            if(number){
                if(number >= 1 && number <= this.totalPage){
                    if(number != this.currentPage){
                        this.currentPage = number
                        this.getListData()
                    }
                }else{
                    alert("请输入正确的数字：1~"+this.totalPage);
                }
            }else{
                alert("请输入要跳转的页数")
            }
        },
        publishTheme(e){
            let templateId = e.target.attributes['template_id'].value,
                name = e.target.attributes['template_name'].value
            $.ajax({
                type:'get',
                url:this.host+'api/list/publish',
                data:{
                    templateId:templateId,
                    name:name,
                },
                success(data){
                    if(data.success){
                        alert('发布成功！')
                    }else {
                        alert('可能网络问题，请稍后重试！')
                    }
                },
                error(error){
                    console.log(error.message)
                }
            })
        },
        copyTheme(e){
            let templateId = e.target.attributes['template_id'].value,
                name = e.target.attributes['template_name'].value,
                self = this
            $.ajax({
                type:'get',
                url:this.host+'api/list/copy',
                data:{
                    templateId:templateId,
                    name:name,
                },
                success(data){
                    if(data.success){
                        let result = data.result
                        self.currentPage = 0
                        self.list = result.list
                        self.total = result.total
                        self.totalPage = result.totalPage
                        alert('拷贝成功！')
                    }else {
                        alert('可能网络问题，请稍后重试！')
                    }
                },
                error(error){
                    console.log(error.message)
                }
            })
        },
        deleteTheme(e){
            let templateId = e.target.attributes['template_id'].value,
                name = e.target.attributes['template_name'].value,
                self = this
            $.ajax({
                type:'get',
                url:this.host+'api/list/delete',
                data:{
                    templateId:templateId,
                    name:name,
                    page:this.currentPage
                },
                success(data){
                    let result = data.result
                    if(data.success){
                        if(result.totalPage < self.currentPage){
                            self.currentPage = result.totalPage
                        }
                        self.list = result.list
                        self.total = result.total
                        self.totalPage = result.totalPage
                        alert(data.message)
                    }else {
                        alert('可能网络问题，请稍后重试！')
                    }
                },
                error(error){
                    console.log(error.message)
                }
            })
        }
    }
})