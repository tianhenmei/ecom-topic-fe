/**
 * Created by dagou on 16/10/31.
 */
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express'),
    router = express.Router(),
    uglify = require('uglify-js')
/****FILE UPLOAD */
var multiparty = require('multiparty');
var sizeOf = require('image-size');
/****FILE UPLOAD */
/****DOCUMENT || PRODUCTION */
var crypto = require('crypto'),  // 使用它生成时间的hash值
    isProd = process.env.NODE_ENV === 'production',
    // saveDir: 发布页面时保存的页面目录
    saveDir = isProd ? '/data/data/topic-publish/topic/v3/' : 'publish/',
    // getDataPath: 获取发布页面时保存的页面的数据目录
    getDataPath = isProd ? '/data/data/topic-publish/topic/v3/' : '../publish/',
    // staticPath: 上传文件存储的目录
    staticPath = isProd ? './public/files/' : './public/files/' ,
    // concatPath: 开发与生成应该属于同一个目录，所以不会改变
    concatPath = isProd ? './dist/editorPC/publish/' : './dist/editorPC/publish/'
 /****DOCUMENT || PRODUCTION */
var writeHTML = require('../build/render-pc.js'),
    writeHTMLH5 = require('../build/render-h5.js'),
    child_process = require('child_process')
    
router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

// 保存数据
router.post('/api/editorPC/saveData',function(req,res){
    var page = req.body;
    console.log('Saving data...')
    mkdirsSync(saveDir+page.name+'/js','0777');
    // 创建文件及文件夹
    writeFile(saveDir+page.name+'/js/index.json',page.elemDatas)
    res.json({
        state:200,
        success:true,
        message:'保存成功'
    });
});

router.post('/api/editorPC/savePage',function(req,res){
    var page = req.body;
    console.log('Saving page...')
    // 创建文件及文件夹
    setFile(page,res);
});

router.post('/api/editorPC/getPageData',function(req,res){
    var name = req.body.html ? req.body.html : 'text',
        templateId = req.body.id,
        dirpath = saveDir+req.body.html
    if(!fs.existsSync(dirpath) && !templateId && req.body.html){
        let secret = new Date().getTime()+'',
            // hash = crypto.createHmac('md5', secret)
            //             .update('yh')
            //             .digest('hex')
            hash = crypto.randomBytes(8)
                        .toString('hex'),
            newdata = {
                pageInfo:{
                    templateId:hash,
                    templateType:'PC',
                    name:'YH EDITOR PC',
                    templateCategory:'测试',
                    title:'YH EDITOR PC',
                    createTime:new Date(),
                    createAuthor:'gaohui',
                    updateTime:'',
                    updateAuthor:'gaohui',
                    html:req.body.html,
                    description:'YH EDITOR PC TEST',
                    activeTimeStart:'',
                    activeTimeEnd:'',
                    keywords:'',
                    lgID:'',
                    lgH5ID:'',
                    scriptsJson:[],
                    share:{
                        status:false,
                        url:'',
                        title:'',
                        desc:'',
                        pic:''
                    }
                },
                elements:[],
                includes:[],
                count:0
            }
        mkdirsSync(dirpath+'/js','0777');
        writeFile(dirpath+'/js/index.json',JSON.stringify(newdata))
        res.json({
            state:200,
            success:true,
            content:newdata
        });
        return
    }
    fs.readFile(path.resolve(__dirname,getDataPath+name+'/js/index.json'),'utf-8',function(err,data){
        if(err){
            console.log(err)
            res.json({
                state:200,
                success:false,
                content:{
                    message:'NOT FOUND PAGE '+name.toLocaleUpperCase(),
                    count:0,
                    includes:[],
                    elements:[]
                }
            })
        }else{
            var data = JSON.parse(data)
            if(data.count){
                data.count = parseInt(data.count)
            }
            res.json({
                state:200,
                success:true,
                content:data
            });
        }
    })
});

router.post('/api/editorPC/upload',function(req,res){
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: staticPath});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);

        if(err){
            console.log('parse error: ' + err);
        } else {
            var inputFile = files.files[0]
            var uploadedPath = inputFile.path
            var dstPath = staticPath + inputFile.originalFilename
            var type = inputFile.headers['content-type']
            if(/(image)/g.test(type)){
                var dimensions = sizeOf(uploadedPath);
                res.json({
                    state:200,
                    success:true,
                    content:{
                        path:isProd ? uploadedPath.replace('public/','static/') : uploadedPath.replace('public/','static/'),
                        width:dimensions.width,
                        height:dimensions.height,
                        size:inputFile.size   // b 为单位
                    }
                });
            }else{
                res.json({
                    state:200,
                    success:true,
                    content:{
                        path:uploadedPath,
                        size:inputFile.size   // b 为单位
                    }
                });
            }
            
            //重命名为真实文件名
            // fs.rename(uploadedPath, dstPath, function(err) {
            //     if(err){
            //         console.log('rename error: ' + err);
            //     } else {
                    
            //     }
            // });
        }
    });
});

router.post('/api/editorPC/saveComponent',function(req,res){
    var page = req.body;
    console.log('Saving component...')
    // 创建文件及文件夹
    mkdirsSync('src/editorPC/components/Custom/style1','0777');
    mkdirsSync('src/editorPC/components-pc/Custom/style1','0777');
    mkdirsSync('src/editorPC/components-h5/Custom/style1','0777');
    writeFileSync('src/editorPC/components/Custom/style1/index.vue',page.html)
    writeFileSync('src/editorPC/components/Custom/style1/index.css',page.css)
    writeFileSync('src/editorPC/components-pc/Custom/style1/index.vue',page.PC)
    writeFileSync('src/editorPC/components-pc/Custom/style1/index.css',page.css)
    writeFileSync('src/editorPC/components-h5/Custom/style1/index.vue',page.H5)
    writeFileSync('src/editorPC/components-h5/Custom/style1/index.css',page.h5css)
    res.json({
        state:200,
        success:true,
        message:"保存成功"
    })
});

router.get('/api/editorPC/getCustomData',function(req,res){
    fs.readdir('src/editorPC/components/Custom/', function(err, files) {
        if (err) {  
            console.log('read dir error');
            res.json({
                state:200,
                success:false,
                message:"Something wrong"
            })
            next(err)
        }else{
            let content = []
            files.forEach(function(item){
                content.push(item)
            })
            res.json({
                state:200,
                success:true,
                content:content
            })
        }
    })
});

function setResJSON(res,status,str){
    if(str){
        res.json({
            state:200,
            success:true,
            message:str
        })
    }else{
        res.json({
            state:200,
            success:true,
            message:'保存成功'
        })
    }
    // switch(status){
    //     case 200:
    //         res.json({
    //             state:200,
    //             success:true,
    //             message:'保存成功'
    //         })
    //         break
    //     case 404:
    //         res.json({
    //             state:200,
    //             success:true,
    //             message:'页面不存在'
    //         })
    //         break
    //     default:
    //         res.json({
    //             state:200,
    //             success:true,
    //             message:'页面渲染失败'
    //         })
    //         break
    // }
}

function setFile(page,res){
    let saveStatus = 0,
        str = ''
    mkdirsSync(saveDir+page.name+'/js','0777');
    mkdirsSync(saveDir+page.name+'/css','0777');
    if(!page.includes){
        page.includes = [];
    }
    writeCSS(page.includes,saveDir+page.name+'/css/index.css')
    writeJS(page.includes,saveDir+page.name+'/js/index.js');
    writeFile(saveDir+page.name+'/js/index.json',page.elemDatas)
    // writeHTML(page.content.replace(/(http:\/\/localhost:9000\/)/g,'/'),saveDir+page.name+'/index.html',{
    //     includes:page.includes,
    //     count:page.count
    // })
    writeHTML(router,page.name,saveDir+page.name+'/index.html',{
        includes:page.includes,
        count:page.count
    },page.elemDatas,res,function(status){
        if(status != 200){
            str += 'PC保存失败！'
        }
        if(saveStatus == 1){
            setResJSON(res,status,str)
        }else{
            saveStatus++;
        }
    })
    writeCSSH5(page.includes,saveDir+page.name+'/css/m_index.css')
    writeJSH5(page.includes,saveDir+page.name+'/js/m_index.js');
    writeHTMLH5(router,page.name,saveDir+page.name+'/m_index.html',{
        includes:page.includes,
        count:page.count
    },page.elemDatas,res,function(status){
        if(status != 200){
            str += '移动端保存失败！'
        }
        if(saveStatus == 1){
            setResJSON(res,status,str)
        }else{
            saveStatus++;
        }
    })
}

function concat(fileIn,fileOut,data){
    var fileArray = Array.isArray(fileIn)? fileIn : [fileIn],
        origCode,
        ast,
        finalCode='',
        path = '',
        status = false;
    for(var i = 0; i < fileArray.length; i++) {
        path = concatPath+'js/'+fileArray[i]+'.js'
        origCode = ''
        status = fs.existsSync(path)
        if(status){
            origCode = fs.readFileSync(path, 'utf8');
        }
        // switch(fileArray[i]){
        //     case 'state':
        //         finalCode += 'elementStates = '+JSON.stringify(data.elementsStates)+';\n'
        //         break
        //     case 'event':
        //         finalCode += 'elementsEvent = '+JSON.stringify(data.elementsEvent)+';\n'
        //         break
        // }
        finalCode += origCode + '\n\n\n\n\n\n\n\n';
    }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}

function writeJS(data,path){
    // uglify
    // child_process.exec(cmd, [options], callback)
    let jsList = ['event'],
        i = 0
    for(i = 0; i < data.length; i++){
        switch(data[i]){
            case '':
                break
        }
    }
    jsList = data.concat(jsList)
    jsList = ['global'].concat(jsList)
    console.log(jsList)
    // console.log(data.elementsStates)
    concat(jsList,path,data);  // ,'./publish/base/js/bgmusic.js'
    
    child_process.exec('npm run compile -- --dir test',function(){
        // console.log('node编译完成')
    })
}

function writeJSH5(data,path){
    let i = 0,
        sdata = JSON.parse(JSON.stringify(data))
    for(i = 0; i < sdata.length; i++){
        sdata[i] += '_h5';
    }
    let jsList = ['event']
    jsList = sdata.concat(jsList)
    jsList = ['global'].concat(jsList)

    concat(jsList,path,sdata);
    
    child_process.exec('npm run compile -- --dir test',function(){
        // console.log('node编译完成')
    })
}

function writeCSS(data,fileOut){
    var finalCode = '',
        origCode = '',
        path = '',
        status = false,
        cssArr = ['init'].concat(data);
    for(var i = 0; i < cssArr.length; i++) {
        origCode = ''
        switch(cssArr[i]){
            case 'init':
                path = './public/css/'+cssArr[i]+'.css'
                break;
            default:
                path = './dist/editorPC/components/'+cssArr[i]+'.css'
                break;
        }
        status = fs.existsSync(path)
        if(status){
            origCode = fs.readFileSync(path, 'utf8');
        }
        
        // switch(fileArray[i]){
        //     case 'state':
        //         finalCode += 'elementStates = '+JSON.stringify(data.elementsStates)+';\n'
        //         break
        //     case 'event':
        //         finalCode += 'elementsEvent = '+JSON.stringify(data.elementsEvent)+';\n'
        //         break
        // }
        finalCode += origCode + '\n\n\n\n\n\n\n\n';
    }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}

function writeCSSH5(data,fileOut){
    var finalCode = '',
        origCode = '',
        path = '',
        status = false,
        cssArr = ['init'].concat(data);
    for(var i = 0; i < cssArr.length; i++) {
        origCode = ''
        switch(cssArr[i]){
            case 'init':
                path = './public/css/'+cssArr[i]+'-h5.css'
                break;
            default:
                path = './dist/editorPC/components-h5/'+cssArr[i]+'.css'
                break;
        }
        status = fs.existsSync(path)
        if(status){
            origCode = fs.readFileSync(path, 'utf8');
        }
        finalCode += origCode + '\n\n\n\n\n\n\n\n';
    }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}

function writeFile(path,string){
    fs.writeFile(path,string,function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('update: '+path);
    });
}

function writeFileSync(path,string){
    fs.writeFileSync(path,string,'utf8');
}

//创建多层文件夹 同步
function mkdirsSync(dirpath, mode) { 
    if (!fs.existsSync(dirpath)) {
        var pathtmp,
            i = 0;
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
            }else if(i == 0 && !dirname){
                pathtmp = '/'
                i++;
            }
        });
    }
    return true; 
}


router.use(function(req,res,next){
    // console.log(req.url);
    // res.status(404).send('Sorry cant find that!');
    next()
});

router.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;