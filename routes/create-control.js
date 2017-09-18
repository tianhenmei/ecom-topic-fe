/**
 * Created by dagou on 16/10/31.
 */
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express'),
    router = express.Router()
/****DOCUMENT || PRODUCTION */
var crypto = require('crypto'),  // 使用它生成时间的hash值
    isProd = process.env.NODE_ENV === 'production',
    // saveDir: 发布页面时保存的页面目录
    saveDir = isProd ? '/data/data/topic-publish/topic/v3/' : 'publish/',
    // getDataPath: 获取发布页面时保存的页面的数据目录
    getDataPath = isProd ? '/data/data/topic-publish/topic/v3/' : '../publish/'
/****DOCUMENT || PRODUCTION */
// router.use(bodyParser.json({limit: '50mb'}));
// router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded());

router.post('/api/create/create',function(req,res){
    let data = req.body || {},
        dirpath = data.html,
        secret = new Date().getTime()+'',
        // hash = crypto.createHmac('md5', secret)
        //             .update('yh')
        //             .digest('hex')
        hash = crypto.randomBytes(8)
                    .toString('hex'),
        newdata = {
            pageInfo:{
                templateId:hash,
                templateType:'H5',
                name:data.name,
                templateCategory:data.templateCategory,
                title:data.title,
                html:dirpath,
                activeTimeStart:data.activeTimeStart,
                activeTimeEnd:data.activeTimeEnd,
                keywords:data.keywords,
                lgID:data.lgID,
                lgH5ID:data.lgH5ID,
                scriptsJson:data.scriptsJson,
                createTime:new Date(),
                createAuthor:'gaohui',
                updateTime:new Date(),
                updateAuthor:'gaohui',
                description:'YH EDITOR H5 create',
                share:{
                    // status:data.supportH5,
                    url:data.shareUrl,
                    title:data.shareTitle,
                    desc:data.shareDesc,
                    pic:data.shareImg
                }
            },
            elements:[],
            includes:[],
            count:0
        }
    mkdirsSync(saveDir+dirpath+'/js','0777');
    writeFile(saveDir+dirpath+'/js/index.json',JSON.stringify(newdata))
    res.json({
        state:200,
        success:true,
        content:newdata
    });
});
router.post('/api/create/update',function(req,res){
    let data = req.body || {}
    if(data.html != data.oldhtml){
        fs.renameSync(saveDir+data.oldhtml,saveDir+data.html)
    }
    let dirpath = data.html,
        secret = new Date().getTime()+'',
        // hash = crypto.createHmac('md5', secret)
        //             .update('yh')
        //             .digest('hex')
        hash = crypto.randomBytes(8)
                    .toString('hex'),
        str = fs.readFileSync(path.resolve(__dirname,'../'+saveDir+dirpath+'/js/index.json'),{
            encoding:'utf-8'
        }),
        newdata = JSON.parse(str)
    newdata.pageInfo = {
        templateId:data.templateId ? data.templateId : hash,
        templateType:'H5',
        name:data.name,
        templateCategory:data.templateCategory,
        title:data.title,
        html:dirpath,
        activeTimeStart:data.activeTimeStart,
        activeTimeEnd:data.activeTimeEnd,
        keywords:data.keywords,
        lgID:data.lgID,
        lgH5ID:data.lgH5ID,
        scriptsJson:data.scriptsJson,
        createTime:data.createTime,
        createAuthor:data.createAuthor,
        updateTime:new Date(),
        updateAuthor:'gaohui',
        description:'YH EDITOR H5 create',
        share:{
            // status:data.supportH5,
            url:data.shareUrl,
            title:data.shareTitle,
            desc:data.shareDesc,
            pic:data.shareImg
        }
    }
    writeFile(saveDir+dirpath+'/js/index.json',JSON.stringify(newdata))
    res.json({
        state:200,
        success:true,
        content:newdata.pageInfo
    });
});
router.post('/api/create/getPageData',function(req,res){
    var html = req.body.html,
        dirpath = saveDir+req.body.html,
        status = fsExistsSync(dirpath)
    if(!html){
        res.json({
            state:200,
            success:false,
            content:'当前未指定页面！'
        });
        return
    }
    if(!status){
        res.json({
            state:200,
            success:false,
            content:'URL所指定的页面不存在！'
        });
        return
    }
    fs.readFile(path.resolve(__dirname,'../'+dirpath+'/js/index.json'),'utf-8',function(err,data){
        if(err){
            console.log(err)
            res.json({
                state:200,
                success:false,
                content:'NOT FOUND PAGE '+html.toLocaleUpperCase()
            })
        }else{
            var data = JSON.parse(data)
            res.json({
                state:200,
                success:true,
                content:data.pageInfo
            });
        }
    })
});
router.post('/api/create/checkurl',function(req,res){
    let data = req.body || {},
        url = data.url,
        status = fsExistsSync(saveDir+url)
    
    res.json({
        state:200,
        success:status,
        message:status ? "改URL已经存在" : "可用"
    });
});

//检测文件或者文件夹存在 nodeJS
function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}
function writeFile(path,string){
    fs.writeFile(path,string,function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('update: '+path);
    });
}
//创建多层文件夹 同步
function mkdirsSync(dirpath, mode) { 
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if(dirname){
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                }else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp, mode)) {
                        return false;
                    }
                }
            }
        });
    }
    return true; 
}

router.use(function(req,res,next){
    // console.log(req.url);
    // res.status(404).send('Sorry cant find that!');
    next();
});

router.use(function(err,req,res,next){
    // console.log(err.stack);
    // res.status(500).send('Something broke!');
    next(err);
});

module.exports = router;