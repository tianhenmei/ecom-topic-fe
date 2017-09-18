console.log(elementStates)
initElementStatesEvent()
function initElementStatesEvent(){
    let istab = ''
    for(let id in elementStates){
        for(let i = 0; i < elementStates[id].length; i++){
            istab = document.getElementById(id).attributes['yh-tab']
            if(istab){
                initTabEvent(elementStates[id][i],id)
            }else{
                setElementState(elementStates[id][i],id)
            }
        }
    }
}
function setElementState(elementState,id){
    switch(elementState.type){
        case 'active':
            (function(classname,yhnumber,src){
                let current = $('#'+id+' [yh-states]')
                if(src){
                    current.attr('yh-old-src',current.attr('src'))
                }
                current.on('touchstart',function(e){
                    if($(this).hasClass('yh-invalid')){
                        return
                    }
                    switch(yhnumber){
                        case '1':
                            if(!$(this).hasClass(classname)){
                                $(this).addClass(classname)
                                if(src){
                                    $(this).attr('src',src)
                                }
                            }
                            break
                        case 'N':
                            if($(this).hasClass(classname)){
                                $(this).removeClass(classname)
                                if(src){
                                    $(this).attr('src',$(this).attr('yh-old-src'))
                                }
                            }else{
                                $(this).addClass(classname)
                                if(src){
                                    $(this).attr('src',src)
                                }
                            }
                            break
                    }
                })
            })(elementState.classname,elementState['yh-number'],elementState['yh-src'])
            break
        case 'invalid':
            let now = new Date().getTime(),
                start = new Date(elementState['yh-valid-start']).getTime(),
                end = new Date(elementState['yh-valid-end']).getTime(),
                current = $('#'+id+' [yh-states]')
            if(now < start || now > end) {
                switch(elementState['yh-valid-type']){
                    case "stylechange":
                        current.addClass(elementState.classname+' yh-invalid')
                        if(elementState['yh-src']){
                            current.attr('src',elementState['yh-src'])
                        }
                        break
                    case "hide":
                        $('#'+id).hide()
                        current.addClass('yh-invalid')
                        break
                }
            }
            break
        case 'audio':
            initElementAudioEvent(elementState,id)
            break
    }
}
// elementState.classname: 'element64-states0',
//元素状态：显示或隐藏 elementState.status: 'show' | 'hide',
//播放方式：点击或翻页 elementState.method: 'click' | 'flip',
//是否可循环点击： elementState['yh-number']: 'N',
//音乐切换图片： elementState['yh-src']: 'http://localhost:9000/static/images/music-close.png',
//是否循环播放： elementState['yh-count']: '0' | '1'
function initElementAudioEvent(data,id){
    let current = $('#'+id+' [yh-states]'),
        pageIndex = current.closest('.page').index(),
        audio = current.siblings('audio')
    if(data['yh-src']){
        current.attr('yh-old-src',current.attr('src'))
    }
    if(data['yh-count'] && data['yh-count'] == '1'){
        audio.attr('loop','loop')
    }
    switch(data.method){
        case 'click':
            current.on('touchstart',function(e){
                if(audio[0].paused){  // 暂停
                    $(this).addClass(data.classname)
                    if(data['yh-src']){
                        $(this).attr('src',data['yh-src'])
                    }
                    audio[0].play()
                }else{  // 播放
                    $(this).removeClass(data.classname)
                    if(data['yh-src']){
                        $(this).attr('src',$(this).attr('yh-old-src'))
                    }
                    audio[0].pause()
                }
            })
            break
        case 'flip':
            if(!pageDone[pageIndex]){
                pageDone[pageIndex] = {}
            }
            pageDone[pageIndex][id] = {
                'yh-src':data['yh-src'],
                type:data.type,
                classname:data.classname
            }
            break
    }
}