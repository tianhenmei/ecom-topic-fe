webpackJsonp([0],[,function(t,e,a){"use strict";a(3);var s=a(0),i=function(t){return t&&t.__esModule?t:{default:t}}(s);i.default.config.debug=!0;new i.default({el:"#app",data:function(){return{title:"YH LIST",host:"http://localhost:9000",href:"/dist/editorPC/index.html",chref:"/dist/createPC/index.html",total:0,eachPage:10,currentPage:1,totalPage:10,list:[{activeTimeEnd:"",activeTimeStart:"",createAuthor:"gaohui",createTime:"2017/06/19 15:26",description:"YH EDITOR PC TEST",html:"text",share:{status:!1,title:"",desc:"",pic:""},templateCategory:"测试",templateId:"10001",templateType:"PC",title:"YH EDITOR PC",updateAuthor:"gaohui",updateTime:"2017/07/02 22:31:27"}]}},mounted:function(){this.getListData()},methods:{getListData:function(){var t=this;$.ajax({type:"post",url:this.host+"/list/getListData",data:{page:this.currentPage,eachPage:this.eachPage},success:function(e){var a=e.result;t.list=a.list,t.total=a.total,t.totalPage=a.totalPage},error:function(t){console.log(t.message)}})},showPreList:function(t){this.currentPage>1&&(this.currentPage-=1,this.getListData())},showNextList:function(t){this.currentPage<this.totalPage&&(this.currentPage+=1,this.getListData())},showPointList:function(t){var e=parseInt(this.$refs["point-number"].value);e?e>=1&&e<=this.totalPage?e!=this.currentPage&&(this.currentPage=e,this.getListData()):alert("请输入正确的数字：1~"+this.totalPage):alert("请输入要跳转的页数")},publishTheme:function(t){var e=t.target.attributes.template_id.value;$.ajax({type:"get",url:this.host+"/list/publish",data:{templateId:e},success:function(t){t.success?alert("发布成功！"):alert("可能网络问题，请稍后重试！")},error:function(t){console.log(t.message)}})},deleteTheme:function(t){var e=t.target.attributes.template_id.value;$.ajax({type:"get",url:this.host+"/list/delete",data:{templateId:e},success:function(t){t.success?alert("删除成功！"):alert("可能网络问题，请稍后重试！")},error:function(t){console.log(t.message)}})}}})},,function(t,e){},,function(t,e,a){t.exports=a(1)}],[5]);