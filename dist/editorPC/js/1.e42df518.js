webpackJsonp([1],Array(18).concat([function(t,e,o){function n(t){i||o(48)}var i=!1,s=o(5)(o(40),o(46),n,null,null);s.options.__file="/Users/dagou/Documents/workspace/20161117work/plat-topic-fe/src/editorPC/components/CompanyPosition/style1/index.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports},,function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(30),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default={components:{"yh-edit-input":i.default},props:["parent","options"],data:function(){return{optionsData:{name:this.options.cn,stylename:this.options.en,unit:"",realunit:"",type:"text",style:this.parent},list:["#000000","#424242","#636363","#9C9C94","#CEC6CE","#EFEFEF","#F7F7F7","#FFFFFF","#FF0000","#FF9C00","#FFFF00","#00FF00","#00FFFF","#0000FF","#9C00FF","#FF00FF","#F7C6CE","#FFE7CE","#FFEFC6","#D6EFD6","#CEDEE7","#CEE7F7","#D6D6E7","#E7D6DE","#E79C9C","#FFC69C","#FFE79C","#B5D6A5","#A5C6CE","#9CC6EF","#B5A5D6","#D6A5BD","#E76363","#F7AD6B","#FFD663","#94BD7B","#73A5AD","#6BADDE","#8C7BC6","#C67BA5","#CE0000","#E79439","#EFC631","#6BA54A","#4A7B8C","#3984C6","#634AA5","#A54A7B","#9C0000","#B56308","#BD9400","#397B21","#104A5A","#085294","#311873","#731842","#630000","#7B3900","#846300","#295218","#083139","#003163","#21104A","#4A1031","transparent"],changeStatus:!1}},mounted:function(){$(this.$el).find(".yh-edit-value > input")[0].addEventListener("focus",this.showEditLayer),this.$el.addEventListener("mouseleave",this.hideEditLayer)},methods:{showEditLayer:function(t){$(t.target).closest(".yh-edit-input").find(".yh-edit-list").show(),this.changeStatus=!1},hideEditLayer:function(t){this.changeStatus||$(t.target).closest(".yh-edit-input").find(".yh-edit-list").hide()},setValue:function(t,e,o){this.options.backstatus?this.$emit("setValue",t,o,o):this.$store.commit("setValue",{parent:this.type?this.type.parent:"css",index:this.type?this.type.index:-1,stylename:t,actualValue:o,designValue:o})},setChangeStatus:function(t){this.changeStatus=!0,this.$emit("setChangeStatus",!0)},colorChange:function(t){var e=t.target,o=e.value,n=$(e).closest(".yh-edit-input").find(".yh-edit-value > input");this.setValue(this.options.en,o,o),n.val(o)},setColor:function(t){var e=t.target,o=e.attributes.value.value,n=$(e).closest(".yh-edit-input").find(".yh-edit-value > input");this.setValue(this.options.en,o,o),n.val(o)}}}},function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=o(31),s=n(i),a=o(28),r=n(a);e.default={components:{"yh-edit-tab":s.default,"yh-edit-color":r.default},props:["css","common","owndata","parent_id"],data:function(){return{yhmodule:{YHEditColor:r.default},tabOptions:{base:{tabs:[{title:"样式设置"},{title:"移动端设置"},{title:"数据设置"}]}}}},methods:{removeElement:function(t){var e=$(".setting"),o=e.attr("id");this.$store.commit("removeElement",o),$(".setting").removeClass("setting"),$(".yh-edit-layer").addClass("hide"),$(".yh-selection").hide()},undoElement:function(t){$(".setting").removeClass("setting"),$(".yh-edit-layer").addClass("hide"),$(".yh-selection").hide()}}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},i=o(0);e.default={props:["options","type"],data:function(){return{}},computed:n({getDesignValue:function(){var t=this.options.style[this.options.stylename].value;if("number"===this.options.type){var e=parseFloat(t);return this.options.unit===this.options.realunit?e:this.getDesign(e)}return t}},(0,i.mapState)({})),methods:{getDesign:function(t){return 46.875*t},getRemValue:function(t){return t/46.875},setValue:function(t){var e=t.target,o=e.value,n=this.options.unit?this.options.unit:"",i=this.options.realunit?this.options.realunit:"",s=this.options.stylename,a=n==i?o+i:this.getRemValue(parseFloat(o))+i;this.type&&-1!=this.type.index&&void 0!=this.type.index?this.$emit("setValue",s,a,o,this.type.index):(console.log("stylename: "+s),this.$store.commit("setValue",{parent:this.type?this.type.parent:"css",stylename:s,actualValue:a,designValue:o}),this.options.backstatus&&this.$emit("setValue",s,a,o))}}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["props"],data:function(){return{style:{width:200,height:100},position:{width:750,left:0,top:0},status:!0,active:0}},methods:{changeTab:function(t){var e=$(t.target).closest(".yh-tab-one"),o=e.index();o!=this.active&&(this.active=o)}}}},function(t,e,o){e=t.exports=o(4)(void 0),e.push([t.i,"\n.yh-edit-tab {\n    width:242px;\n    height:520px;\n    box-shadow:0px 0px 6px #ccc;\n    background:#fff;\n    position:fixed;\n    right:0;\n    top:50px;\n}\n.yh-edit-tab .yh-edit-tabTitle{\n    width:100%;\n}\n.yh-edit-tab .yh-edit-tabTitle > div {\n    padding: 0 10px;\n    line-height: 26px;\n    float:left;\n    text-align:center;\n    font-size:14px;\n    color:#666;\n    background:#efefef;\n    cursor:pointer;\n}\n.yh-edit-tab .yh-edit-tabTitle > div:hover,\n.yh-edit-tab .yh-edit-tabTitle > div.yh-tab-active{\n    background:#ff0084;\n    color:#fff;\n}\n.yh-edit-tab .yh-edit-tabContent > div{\n    position: relative;\n    display:none;\n}\n.yh-edit-tab .yh-edit-tabContent > div.yh-tab-active{\n    display:block;\n}\n",""])},function(t,e,o){e=t.exports=o(4)(void 0),e.push([t.i,"\n.yh-edit-input {\n    width:100%;\n    padding:0 0 5px 0;\n    position:relative;\n}\n.yh-edit-input .yh-edit-text{\n    width: 80px;\n    height: 25px;\n    line-height: 25px;\n    float:left;\n    text-align:right;\n    font-size:12px;\n    color:#666;\n    /*background: #fff;*/\n}\n.yh-edit-input .yh-edit-value{\n    width:100px;\n    padding:0 5px 0 0;\n    /*background: #fff;*/\n    float:left;\n}\n.yh-edit-input .yh-edit-value input {\n    width: 78px;\n    height: 23px;\n    line-height: 23px;\n    border:1px solid #ccc;\n    float:left;\n    font-size: 12px;\n    color: #666;\n    background: transparent;\n}\n.yh-edit-input .yh-edit-value input.yh-edit-value-input-long{\n    width:98px;\n}\n.yh-edit-input .yh-edit-value span {\n    width: 20px;\n    height: 25px;\n    line-height: 25px;\n    text-align: center;\n    font-size: 12px;\n    color: #666;\n    float:left;\n}\n",""])},function(t,e,o){e=t.exports=o(4)(void 0),e.push([t.i,"\n.yh-edit-chooser {\n    width:25px;\n    height:25px;\n    float:left;\n    position:relative;\n}\n.yh-edit-chooser .yh-edit-vcolor {\n    width:25px;\n    height:25px;\n    border:none;\n    position:absolute;\n    left:0;\n    top:0;\n}\n.yh-edit-chooser .yh-edit-list {\n    width:176px;\n    position: absolute;\n    right: 0;\n    top: 100%;\n    background: #fff;\n    padding:2px 0 0 2px;\n    box-shadow: 0 0 10px #ccc;\n    display:none;\n    z-index: 10;\n}\n.yh-edit-chooser .yh-edit-list li {\n    width:18px;\n    height:18px;\n    margin:0 2px 2px 0;\n    border:1px solid #efefef;\n    cursor:pointer;\n    float:left;\n}\n.yh-edit-chooser .yh-edit-list li.transparent{\n    background:url('http://localhost:9000/static/images/icons.png') no-repeat 0 -1700px;\n}\n",""])},function(t,e,o){e=t.exports=o(4)(void 0),e.push([t.i,"\n.yh-edit-layer {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index:1000;\n}\n.yh-delete-undo{\n    width:45px;\n    height:17px;\n    font-family: serif;\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n.yh-delete-undo .yh-delete,\n.yh-delete-undo .yh-undo {\n    width: 17px;\n    height: 17px;\n    line-height: 17px;\n    border: 1px solid #ff0084;\n    border-radius: 17px;\n    font-size: 12px;\n    text-align: center;\n    color: #ff0084;\n    cursor: pointer;\n    float:left;\n    margin:0 3px 0 0;\n}\n.yh-delete-undo .yh-delete {\n    font-family: initial;\n}\n",""])},function(t,e,o){function n(t){i||o(38)}var i=!1,s=o(5)(o(20),o(34),n,null,null);s.options.__file="/Users/dagou/Documents/workspace/20161117work/plat-topic-fe/src/editorPC/edit-components/yh-edit-color.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] yh-edit-color.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports},function(t,e,o){function n(t){i||o(39)}var i=!1,s=o(5)(o(21),o(35),n,null,null);s.options.__file="/Users/dagou/Documents/workspace/20161117work/plat-topic-fe/src/editorPC/edit-components/yh-edit-complicated.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] yh-edit-complicated.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports},function(t,e,o){function n(t){i||o(37)}var i=!1,s=o(5)(o(22),o(33),n,null,null);s.options.__file="/Users/dagou/Documents/workspace/20161117work/plat-topic-fe/src/editorPC/edit-components/yh-edit-input.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] yh-edit-input.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports},function(t,e,o){function n(t){i||o(36)}var i=!1,s=o(5)(o(23),o(32),n,null,null);s.options.__file="/Users/dagou/Documents/workspace/20161117work/plat-topic-fe/src/editorPC/edit-components/yh-edit-tab.vue",s.esModule&&Object.keys(s.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] yh-edit-tab.vue: functional components are not supported with templates, they should use render functions."),t.exports=s.exports},function(t,e,o){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"yh-edit-tab"},[o("div",{staticClass:"clearfix yh-edit-tabTitle"},t._l(t.props.base.tabs,function(e,n){return o("div",{staticClass:"yh-tab-one",class:t.active==n?"yh-tab-active":"",on:{touchstart:function(e){e.stopPropagation(),e.preventDefault(),t.changeTab(e)},mousedown:function(e){e.stopPropagation(),e.preventDefault(),t.changeTab(e)}}},[t._v(t._s(e.title))])})),t._v(" "),o("div",{staticClass:"yh-edit-tabContent"},t._l(t.props.base.tabs,function(e,n){return o("div",{class:t.active==n?"yh-tab-active":""},[t._t("content"+n)],2)}))])},staticRenderFns:[]},t.exports.render._withStripped=!0},function(t,e,o){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"yh-edit-input clearfix"},[o("div",{staticClass:"yh-edit-text"},[t._v(t._s(t.options.name)+t._s(t.options.name?"：":""))]),t._v(" "),o("div",{staticClass:"yh-edit-value clearfix"},[o("input",{class:{"yh-edit-value-input-long":!t.options.unit},attrs:{type:t.options.type},domProps:{value:t.options.style[t.options.stylename]?t.getDesignValue:"number"==t.options.type?0:""},on:{input:t.setValue}}),t._v(" "),t.options.unit?o("span",[t._v(t._s(t.options.unit))]):t._e()]),t._v(" "),t._t("chooser")],2)},staticRenderFns:[]},t.exports.render._withStripped=!0},function(t,e,o){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("yh-edit-input",{attrs:{options:t.optionsData},on:{setValue:t.setValue}},[o("div",{staticClass:"yh-edit-chooser",slot:"chooser"},[o("input",{staticClass:"yh-edit-vcolor",attrs:{type:"color"},on:{click:function(e){e.stopPropagation(),t.setChangeStatus(e)},change:function(e){e.stopPropagation(),t.colorChange(e)}}}),t._v(" "),o("ul",{staticClass:"yh-edit-list clearfix"},t._l(t.list,function(e){return o("li",{class:"transparent"==e?"transparent":"",style:"background-color:"+e,attrs:{value:e},on:{click:function(e){e.stopPropagation(),t.setColor(e)}}})}))])])},staticRenderFns:[]},t.exports.render._withStripped=!0},function(t,e,o){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{ref:t.parent_id+"-yh-edit-layer",staticClass:"yh-edit-layer clearfix hide"},[o("yh-edit-tab",{attrs:{props:t.tabOptions}},[o("div",{staticClass:"yh-edit-tab-content yh-edit-css clearfix",slot:"content0"},t._l(t.css,function(e){return o(t.yhmodule.YHEditColor,{tag:"div",attrs:{parent:t.css,options:e}})})),t._v(" "),o("div",{staticClass:"yh-edit-tab-content yh-edit-deployh5 clearfix",slot:"content1"},[o("div",[t._v("移动端设置")])]),t._v(" "),o("div",{staticClass:"yh-edit-tab-content yh-edit-owndata clearfix",slot:"content2"},[o("div",[t._v("数据设置")])])]),t._v(" "),o("div",{staticClass:"yh-delete-undo"},[o("div",{staticClass:"yh-delete",on:{click:function(e){e.stopPropagation(),t.removeElement(e)}}},[t._v("x")]),t._v(" "),o("div",{staticClass:"yh-undo",on:{click:function(e){e.stopPropagation(),t.undoElement(e)}}},[t._v("√")])])],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},function(t,e,o){var n=o(24);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(6)("ba75da08",n,!1)},function(t,e,o){var n=o(25);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(6)("be50692e",n,!1)},function(t,e,o){var n=o(26);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(6)("3d5897c8",n,!1)},function(t,e,o){var n=o(27);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(6)("4439346a",n,!1)},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(7),i=o(29),s=function(t){return t&&t.__esModule?t:{default:t}}(i),a={id:"",css:{background_background_color:{cn:"背景颜色",en:"background_background_color",value:"#00c99b"},name_color:{cn:"名称颜色",en:"name_color",value:"#ffffff"},all_color:{cn:"详情颜色",en:"all_color",value:"#555555"},positionName_color:{cn:"职位颜色",en:"positionName_color",value:"#00c99b"},salary_color:{cn:"薪资颜色",en:"salary_color",value:"#00c99b"},button_color:{cn:"按钮文字色",en:"button_color",value:"#00c99b"},button_background_color:{cn:"按钮背景色",en:"button_background_color",value:"#ffffff"}},common:{},attribute:{},data:{name:"拉勾网",companyId:147,logo:"i/image/M00/00/1F/Cgp3O1YtkIuAXCPUAAA28p_G-ck324.png",city:"北京",companySize:"150-500人",financestage:"C轮",industryfield:"企业服务,招聘",slogan:"帮用户找到满意的工作",description:"<p>拉勾是一家专注于为职场人提供职业成长机会，为中小型企业提供优质的人力资源服务的公司。成长三年、四轮巨额融资、服务千万用户，拉勾已成为互联网垂直招聘行业的佼佼者。</p>↵<p><br /></p>↵<p>拉勾人相信并恪守：无论如何，用户价值都是第一位的；我们绝不因为利益的获取而放下我们一直引以为傲的德行；我们要用最快的方式去践行质感与创新；我们坚信合作是1+1&gt;2；追求主动学习与承担，也就是为了成为我们自己。</p>↵<p><br /></p>↵<p>未来，拉勾人将继续专注于用户体验，精心耕耘两个业务（招聘业务、自由职业者业务）和一个平台（拉勾云平台），不忘初心，专心做好产品，帮助每一位互联网人获得更多更好的职业成长机会、帮助更多的互联网企业获得更轻便更专业的产品服务。</p>",position:[{dynamic_type:"设计",positionId:"1777398",positionName:"UI设计师",salary:"7k-12k"},{dynamic_type:"设计",positionId:"1777398",positionName:"UI设计师",salary:"7k-12k"},{dynamic_type:"设计",positionId:"1777398",positionName:"UI设计师",salary:"7k-12k"},{dynamic_type:"设计",positionId:"1777398",positionName:"UI设计师",salary:"7k-12k"}]},positionData:{dynamic_type:"设计",positionId:"1777398",positionName:"UI设计师",salary:"7k-12k"}};e.default={props:["props"],components:{"yh-edit-complicated":s.default},data:function(){return{baseData:JSON.parse(JSON.stringify({id:a.id,css:a.css,attribute:a.attribute,data:a.data,common:a.common}))}},mounted:function(){},methods:{recoveryData:n.recoveryData,getDataID:n.getDataID,settingBox:n.settingBox,setAll:function(t){var e=0,o="";for(e=0;e<t.path.length;e++)if(t.path[e].id){o=t.path[e].id;break}$(".setting").removeClass("setting"),$(".yh-edit-layer").addClass("hide"),this.$refs[o].className+=" setting";var n=this.$refs["yh-edit-complicated"].$refs[o+"-yh-edit-layer"];n.className=n.className.replace(/( hide)/g,""),this.settingBox(this.$refs[o])},recoveryModuleData:function(t,e){var o={},n="",i=null,s=null,a=0,r="",l={};for(n in e.data)switch(n){case"position":for(i=t.find("."+n).children(),o[n]=[],a=0;a<i.length;a++){l={};for(r in e.positionData)switch(r){case"dynamic_type":l[r]=i.eq(a).attr(r)?i.eq(a).attr(r):e.positionData[r];break;case"positionId":s=i.eq(a).find(".positionLink"),l[r]=this.getDataID(s.attr("href"),27);break;case"positionName":case"salary":s=i.eq(a).find("."+r),l[r]=s.length>0?s.html():e.positionData[r]}o[n].push(JSON.parse(JSON.stringify(l)))}break;case"companyId":i=t.find(".companyLink"),o[n]=this.getDataID(i.attr("href"),29);break;case"logo":i=t.find("."+n),o[n]=i.length>0?i.attr("src").split("https://www.lgstatic.com/thumbnail_200x200/")[1]:e.data[n];break;case"industryfield":o[n]=t.attr(n);break;case"name":case"city":case"companySize":case"financestage":case"slogan":case"description":default:i=t.find("."+n),o[n]=i.length>0?i.html():e.data[n]}return{data:o}}},initCtor:function(t){return Object.assign({},JSON.parse(JSON.stringify({css:a.css,attribute:a.attribute,data:a.data,common:a.common})),t)},recoveryCtor:function(t,e){return Object.assign({},this.methods.recoveryData(t,a),this.methods.recoveryModuleData(t,a),{common:a.common},e)}}},,function(t,e,o){e=t.exports=o(4)(void 0),e.i(o(44),""),e.push([t.i,"\n/* @import 'http://localhost:9000/dist/editorPC/components/CompanyPosition_style1.css';\n*/\n",""])},,function(t,e,o){e=t.exports=o(4)(void 0),e.push([t.i,".company-position-style1{width:926px;height:280px;margin:0 auto 20px;border-radius:5px;overflow:hidden}.company-position-style1>.leftDiv{width:222px;height:280px;background:#00c99b;float:left}.company-position-style1>.leftDiv .title{padding:38px 0 20px 0}.company-position-style1>.leftDiv img{width:115px;height:115px;border-radius:3px;margin:0 auto 10px;display:block}.company-position-style1>.leftDiv a.nameTop{display:block;font-size:20px;color:#fff;text-align:center;text-decoration:none}.company-position-style1>.leftDiv a.nameTop p.name{width:100%;height:26px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.company-position-style1>.leftDiv div.infoWord{width:116px;margin:0 auto;background:#fff;border-radius:2px;overflow:hidden}.company-position-style1>.leftDiv a.more{width:116px;height:41px;display:block;background:#000;background-color:rgba(0,0,0,.08);filter:Alpha(opacity=8);position:static;*zoom:1;text-decoration:none}.company-position-style1>.leftDiv a.more span{height:38px;line-height:38px;font-size:16px;color:#00c99b;text-align:center;display:block;background:#fff}.company-position-style1>.leftDiv a.more:hover{text-decoration:none}.company-position-style1>.rightDiv{width:703px;height:278px;background:#f0f0f0;float:left;border:solid 1px #e9e9e9;border-left:none;border-radius:0 5px 5px 0;overflow:hidden}.company-position-style1>.rightDiv .slogan{height:50px;line-height:24px;padding:40px 65px 30px;background:#fff no-repeat center center;font-size:16px;color:#555;text-align:left;word-break:break-all}.company-position-style1>.rightDiv .positionList{padding:6px 32px 17px}.company-position-style1>.rightDiv .positionList li{float:left}.company-position-style1>.rightDiv .positionList li .positionUrl{width:252px;height:48px;line-height:48px;padding:0 27px 0 17px;margin:18px 12px 0 11px;display:block;color:#00c99b;font-size:16px;background:#fff no-repeat 270px -158px}.company-position-style1>.rightDiv .positionList li .positionUrl p,.company-position-style1>.rightDiv .positionList li .positionUrl span{text-align:left;float:left}.company-position-style1>.rightDiv .positionList li .positionUrl p.positionName,.company-position-style1>.rightDiv .positionList li .positionUrl span.positionName{width:160px;padding-right:15px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}",""])},,function(t,e,o){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{ref:t.props.id,staticClass:"company-position-style1",attrs:{id:t.props.id,"yh-module":"CompanyPosition_style1",industryfield:t.props.data.industryfield},on:{click:function(e){e.stopPropagation(),e.preventDefault(),t.setAll(e)}}},[o("div",{staticClass:"leftDiv background",style:{"background-color":t.props.css.background_background_color.value}},[o("h3",{staticClass:"title"},[o("a",{staticClass:"nameTop companyLink",attrs:{href:"https://www.lagou.com/gongsi/"+t.props.data.companyId+".html","data-link":"1","data-lg-tj-id":"","data-lg-tj-no":"","data-lg-tj-cid":t.props.data.companyId,target:"_blank"}},[o("img",{staticClass:"logo",attrs:{src:"https://www.lgstatic.com/thumbnail_200x200/"+t.props.data.logo}}),t._v(" "),o("p",{staticClass:"name",style:{color:t.props.css.name_color.value}},[t._v(t._s(t.props.data.name))])])]),t._v(" "),o("div",{staticClass:"infoWord button",style:{color:t.props.css.button_color.value,"background-color":t.props.css.button_background_color.value}},[o("a",{staticClass:"more",attrs:{href:"https://www.lagou.com/gongsi/j"+t.props.data.companyId+".html","data-link":"1","data-lg-tj-id":"","data-lg-tj-no":"","data-lg-tj-cid":t.props.data.companyId,target:"_blank"}},[o("span",{staticClass:"background-color button",style:{"background-color":t.props.css.button_background_color.value,color:t.props.css.button_color.value}},[t._v("更多职位 >")])])])]),t._v(" "),o("div",{staticClass:"rightDiv"},[o("div",{staticClass:"slogan all",style:{color:t.props.css.all_color.value}},[t._v(t._s(t.props.data.slogan))]),t._v(" "),o("ul",{staticClass:"position positionList clearfix"},t._l(t.props.data.position,function(e){return o("li",{attrs:{dynamic_type:e.dynamic_type}},[o("a",{staticClass:"positionUrl positionLink clearfix",attrs:{href:"https://www.lagou.com/jobs/"+e.positionId+".html","lagou-href":"https://www.lagou.com/jobs/"+e.positionId+".html?source=pl&i=pl-0",target:"_blank","data-link":"1","data-lg-tj-id":"","data-lg-tj-no":"","data-lg-tj-cid":e.positionId}},[o("p",{staticClass:"positionName",style:{color:t.props.css.positionName_color.value}},[t._v(t._s(e.positionName))]),t._v(" "),o("p",{staticClass:"salary",style:{color:t.props.css.salary_color.value}},[t._v(t._s(e.salary))])])])}))]),t._v(" "),o("yh-edit-complicated",{ref:"yh-edit-complicated",attrs:{css:t.props.css,parent_id:t.props.id,common:t.props.common,owndata:t.props.data}})],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},,function(t,e,o){var n=o(42);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(6)("337c3cac",n,!1)}]));