var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    router = express.Router(),
    writeHTML = require('../build/render-pc.js'),
    writeHTMLH5 = require('../build/render-h5.js'),
    isProd = process.env.NODE_ENV === 'production',
    // saveDir: 发布页面时保存的页面目录
    saveDir = isProd ? '/data/data/topic-publish/topic/v3/' : 'publish/',
    // getDataPath: 获取发布页面时保存的页面的数据目录
    getDataPath = isProd ? '/data/data/topic-publish/topic/v3/' : '../publish/',
    // concatPath: 开发与生成应该属于同一个目录，所以不会改变
    concatPath = isProd ? './dist/editorPC/publish/' : './dist/editorPC/publish/',
    child_process = require('child_process')

function publishPage(data,name,res){
    mkdirsSync(saveDir+name+'/js','0777');
    mkdirsSync(saveDir+name+'/css','0777');
    if(!data.includes){
        data.includes = [];
    }
    writeCSS(data.includes,saveDir+name+'/css/index.css')
    writeJS(data.includes,saveDir+name+'/js/index.js');
    writeHTML(router,name,saveDir+name+'/index.html',{
        includes:data.includes,
        count:data.count
    },data.elemDatas,res,function(status){
        if(status != 200){
            str += 'PC保存失败！'
        }
        if(saveStatus == 1){
            setResJSON(res,status,str)
        }else{
            saveStatus++;
        }
    })
    writeCSSH5(data.includes,saveDir+name+'/css/m_index.css')
    writeJSH5(data.includes,saveDir+name+'/js/m_index.js');
    writeHTMLH5(router,name,saveDir+name+'/m_index.html',{
        includes:data.includes,
        count:data.count
    },data.elemDatas,res,function(status){
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
            message:'发布成功'
        })
    }
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

module.exports = publishPage
