/**
 * Created by dagou on 16/10/31.
 */
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');

var router = express.Router();
 /****Node request */
 var axios = require('axios')

// router.use(bodyParser.json({limit: '50mb'}));
// router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded());


router.get('/api/company/getCompanyandPosition',function(req,res){
    res.json({
        code:null,
        msg:"查询成功",
        result:{
            companyInfo:{
                99:{
                    approve:2,
                    approvemanemail:null,
                    approvemanid:null,
                    city:"北京",
                    companyaddress:"北京市朝阳区东土城路12号怡和阳光大厦C座1503-04",
                    companyfeatures:"硅谷动力是中国最具影响力的IT门户网站之一",
                    companylat:"",
                    companylng:"",
                    companyname:"北京硅谷动力电子商务有限公司",
                    companyshortname:"硅谷动力",
                    companysize:"50-150人",
                    createmanemail:null,
                    createmanid:null,
                    createtime:1374203779000,
                    customerlabel:"134",
                    description:"作为一个具有社会美誉度的品牌，硅谷动力（www.eNet.com.cn）是一家由互联网技术驱动的科技信息服务商。 ↵<br />↵<br />作为信息服务商，硅谷动力把诚信、公信力等作为最核心、最基础的诉求，立志追求言行一致、知行合一，做令人尊敬的企业，做良知企业。 ↵<br />↵<br />硅谷动力的企业使命：让创造者获得自由与动力，让消费者获得平等与尊严，推动构建自由平等的创新世界！ ↵<br />↵<br />硅谷动力的企业价值观：真诚，良知，热情，创新。 ↵<br />↵<br />以人为本，企业视团队为最核心的财富。每一位认同硅谷动力使命、价值观、心怀梦想和浪漫的人，都是我们最尊贵的朋友，真诚追寻的伙伴。 ↵<br />↵<br />在提供完善的福利保障、公正的机制的同时，我们也将以最大的努力，为每一位进入硅谷动力的成员提供创新的舞台。实现您的理想，就是我们的理想。 ↵<br />↵<br />硅谷动力由管理中心、技术中心、内容中心、运营中心等几大版块组成，以下是正在招聘的职位，我们期待与您的交流。 ↵<br />↵<br />附： ↵<br />↵<br />作为兄弟企业，《互联网周刊》是我国互联网时代的标志性媒体，由中国科学院主管、中国科技出版传媒股份有限公司主办，每月5号、20号出刊，16开彩色印刷，面向全国发行。 ↵<br />↵<br />与兄弟企业一道，定位于发现未来，秉承共同价值观，《互联网周刊》诚招各方人才加盟！",
                    displayContactNum:20,
                    financestage:"未融资",
                    id:99,
                    industryfield:"文化娱乐",
                    isenable:1,
                    logo:"image1/M00/00/01/CgYXBlTUV_SAK5dbAAAdEqGZCxE939.jpg",
                    otherlabel:"岗位晋升,领导好,五险一金"
                },
                147:{
                    approve:2,
                    approvemanemail:null,
                    approvemanid:null,
                    city:"北京",
                    companyaddress:"北京市海淀区中关村创业大街11号海置创投",
                    companyfeatures:"帮用户找到满意的工作",
                    companylat:"39.97862756",
                    companylng:"116.30032543",
                    companyname:"北京拉勾网络技术有限公司",
                    companyshortname:"拉勾网",
                    companysize:"150-500人",
                    createmanemail:null,
                    createmanid:null,
                    createtime:1374279643000,
                    customerlabel:"1947",
                    description:"<p>拉勾是一家专注于为职场人提供职业成长机会，为中小型企业提供优质的人力资源服务的公司。成长三年、四轮巨额融资、服务千万用户，拉勾已成为互联网垂直招聘行业的佼佼者。</p>↵<p><br /></p>↵<p>拉勾人相信并恪守：无论如何，用户价值都是第一位的；我们绝不因为利益的获取而放下我们一直引以为傲的德行；我们要用最快的方式去践行质感与创新；我们坚信合作是1+1&gt;2；追求主动学习与承担，也就是为了成为我们自己。</p>↵<p><br /></p>↵<p>未来，拉勾人将继续专注于用户体验，精心耕耘两个业务（招聘业务、自由职业者业务）和一个平台（拉勾云平台），不忘初心，专心做好产品，帮助每一位互联网人获得更多更好的职业成长机会、帮助更多的互联网企业获得更轻便更专业的产品服务。</p>",
                    displayContactNum:20,
                    financestage:"C轮",
                    id:147,
                    industryfield:"企业服务,招聘",
                    isenable:1,
                    logo:"i/image/M00/76/40/Cgp3O1g1TNOAB2yxAAA9bQUyc4g814.png",
                    otherlabel:"五险一金,弹性工作,带薪年假,免费两餐,扁平管理,股票期权,氛围OPEN,同事大牛,平台好"
                }
            },
            leaderInfos:{
                99:[null],
                147:[{
                    companyid:147,
                    createtime:1433424621000,
                    cyclopediaUrl:"http://baike.baidu.com/subview/10635500/15854470.htm",
                    id:57,
                    isenable:0,
                    isleader:1,
                    name:"马德龙",
                    photo:"i/image/M00/8E/55/Cgp3O1iS-E-AJM8fABVeTaaBFPg838.jpg",
                    position:"CEO",
                    remark:"<p>CEO，拉勾网联合创始人。先后供职于腾讯、百度等顶级互联网企业，拥有丰富的互联网产品研发经验，擅长在产品的用户体验和技术实现之间寻求平衡。参与创建了3W咖啡馆及拉勾网，并担任拉勾网CEO。现全面负责拉勾网的经营管理工作。</p>",
                    weibo:"http://weibo.com/banlon",
                    weibonickname:""
                }]
            },
            positionInfos:{
                99:[{
                    city:"北京",
                    companyId:99,
                    createTime:1374182785000,
                    education:"本科",
                    jobNature:"全职",
                    offlineTime:1395849600000,
                    positionAdvantage:"",
                    positionFirstType:"运营",
                    positionId:539,
                    positionName:"产品频道编辑",
                    positionStatus:"EXPIRED",
                    publishTime:1374182785000,
                    publishUserId:1,
                    receiveEmail:"justin@3wcoffee.com",
                    salary:"2k-20k",
                    salaryMax:20,
                    salaryMin:2,
                    workYear:"不限"
                },{
                    city:"北京",
                    companyId:99,
                    createTime:1374182785000,
                    education:"不限",
                    jobNature:"全职",
                    offlineTime:1395849600000,
                    positionAdvantage:"",
                    positionFirstType:"运营",
                    positionId:540,
                    positionName:"汽车频道编辑",
                    positionStatus:"EXPIRED",
                    publishTime:1374182785000,
                    publishUserId:1,
                    receiveEmail:"justin@3wcoffee.com",
                    salary:"2k-20k",
                    salaryMax:20,
                    salaryMin:2,
                    workYear:"不限"
                },{
                    city:"北京",
                    companyId:99,
                    createTime:1374182785000,
                    education:"不限",
                    jobNature:"全职",
                    offlineTime:1395849600000,
                    positionAdvantage:"",
                    positionFirstType:"运营",
                    positionId:541,
                    positionName:"学院下载频道编辑",
                    positionStatus:"EXPIRED",
                    publishTime:1374182785000,
                    publishUserId:1,
                    receiveEmail:"justin@3wcoffee.com",
                    salary:"2k-20k",
                    salaryMax:20,
                    salaryMin:2,
                    workYear:"不限"
                }],
                147:[{
                    city:"上海",
                    companyId:4,
                    createTime:1374289295000,
                    education:"本科",
                    jobNature:"全职",
                    offlineTime:1395849600000,
                    positionAdvantage:"Web测试工程师",
                    positionFirstType:"技术",
                    positionId:4,
                    positionName:"Web测试工程师",
                    positionStatus:"EXPIRED",
                    publishTime:1374289295000,
                    publishUserId:1,
                    receiveEmail:"justin@3wcoffee.com",
                    salary:"2k-20k",
                    salaryMax:20,
                    salaryMin:2,
                    workYear:"3-5年"
                },{
                    city:"上海",
                    companyId:4,
                    createTime:1374289295000,
                    education:"本科",
                    jobNature:"全职",
                    offlineTime:1395849600000,
                    positionAdvantage:"手机测试工程师",
                    positionFirstType:"技术",
                    positionId:5,
                    positionName:"手机测试工程师",
                    positionStatus:"EXPIRED",
                    publishTime:1374289295000,
                    publishUserId:1,
                    receiveEmail:"justin@3wcoffee.com",
                    salary:"2k-20k",
                    salaryMax:20,
                    salaryMin:2,
                    workYear:"1-3年"
                },{
                    city:"上海",
                    companyId:4,
                    createTime:1374289295000,
                    education:"本科",
                    jobNature:"全职",
                    offlineTime:1395849600000,
                    positionAdvantage:"前端工程师（页面制作）",
                    positionFirstType:"技术",
                    positionId:6,
                    positionName:"前端工程师（页面制作）",
                    positionStatus:"EXPIRED",
                    publishTime:1374289295000,
                    publishUserId:1,
                    receiveEmail:"justin@3wcoffee.com",
                    salary:"2k-20k",
                    salaryMax:20,
                    salaryMin:2,
                    workYear:"1-3年"
                }]
            }
        },
        success:true
    });
});

router.get('/api/company/getCompanyandPosition-online',function(req,res){
    axios.get('http://topic.lagou.com/company/getCompanyandPosition',{
        comAndPosi:req.body.comAndPosi
    })
    .then(function (response) {
        // console.log(response.data);
        res.json({
            state:200,
            success:true,
            code:null,
            msg:"查询成功",
            result:response.data.result
        })
    })
    .catch(function (error) {
        res.json({
            state:500,
            msg:'获取失败！',
            success:false
        })
        // console.log(error);
        next(error)
    })
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
router.use('/api/company/speed_checkCompany/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});
router.post('/api/company/speed_checkCompany/:id', function(req, res,next){
    let result = {
        city:"北京",
        companyId:req.params.id,//"44",
        companyLeader:null,
        companySize:"15-50人",
        description:"北京鼎天投资管理有限公司是一家集资产管理、投资于一身的集团化企业，总部设在北京CBD核心区。在香港和上海有分支机构。主营业务为股权投资及证券投资，对冲基金及衍生产品投资等。公司将秉承开放、创新、诚信、共荣的原则，以信息及人才为优势，立足长远，建设成为具备一流规模和影响力的资产管理公司。现诚邀行业精英加盟，共享广阔前景。",
        financestage:"未融资",
        id:null,
        index:0,
        industryfield:"金融",
        jobIds:null,
        jobs:null,
        logo:"image1/M00/00/01/CgYXBlTUV_OAItuDAABYAZ6vqlw992.jpg",
        name:"北京鼎天",
        otherlabel:"五险一金,电话费补助,每年度体检,年假,文体活动,扁平化管理,管理规范",
        slogan:"北京鼎天主营业务为股权投资及证券投资，对冲基金及衍生产品投资等。",
        title:null,
        voteId:null
    }
    // req.params.id
    res.json({
        state:200,
        success:true,
        result:result
    })
});

// 单公司：online
router.use('/api/company/speed_checkCompany-online/:id', function (req, res, next) {
    next();
});
router.post('/api/company/speed_checkCompany-online/:id', function(req, res,next){
    // req.params.id
    axios.post('http://topic.lagou.com/company/speed_checkCompany/'+req.params.id)
    .then(function (response) {
        // console.log(response.data);
        res.json({
            state:200,
            success:true,
            result:response.data.result
        })
    })
    .catch(function (error) {
        res.json({
            state:500,
            message:'获取失败！',
            success:false
        })
        // console.log(error);
        next(error)
    })
});


// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
router.use('/api/job/speed_checkPosition/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});
router.get('/api/job/speed_checkPosition/:id', function(req, res,next){
    let result = {
        city:"上海",
        companyId:25592,
        createTime:1374289295000,
        education:"本科",
        jobNature:"全职",
        offlineTime:1395849600000,
        positionAdvantage:"员工福利好",
        positionFirstType:"运营",
        positionId:req.params.id,//22,
        positionName:"网站运营专员",
        positionStatus:"EXPIRED",
        publishTime:1374289295000,
        publishUserId:1,
        receiveEmail:"justin@3wcoffee.com",
        salary:"2k-20k",
        salaryMax:20,
        salaryMin:2,
        workYear:"1-3年"
    }
    // req.params.id
    res.json({
        state:200,
        success:true,
        result:result
    })
});
// 单职位：online
router.use('/api/job/speed_checkPosition-online/:id', function (req, res, next) {
    next();
});
router.get('/api/job/speed_checkPosition-online/:id', function(req, res,next){
    console.log(req.params.id)
    // req.params.id
    axios.get('http://topic.lagou.com/job/speed_checkPosition/'+req.params.id)
    .then(function (response) {
        // console.log(response.data);
        res.json({
            state:200,
            success:true,
            result:response.data.result
        })
    })
    .catch(function (error) {
        res.json({
            state:500,
            message:'获取失败！',
            success:false
        })
        next(error)
    })
});

router.use(function(req,res,next){
    // console.log(req.url);
    // res.status(404).send('Sorry cant find that!');
    next();
});

router.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;