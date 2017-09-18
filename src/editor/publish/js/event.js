class YHEvent{
    constructor(){
        this.showElemements = $('[yh-show]')
        this.pageElemements = $('[yh-page]')
        this.hrefElemements = $('[yh-href]')
        this.initShowEvent()
        this.initPageEvent()
        this.initHrefEvent()
    }
    initShowEvent(){
        if(this.showElemements.length > 0){
            this.showElemements.on('touchstart',function(e){
                e.stopPropagation()
                e.preventDefault()
                let elemID = $(this)[0].attributes['yh-show'].value,
                    elem = document.getElementById(elemID),
                    display = window.getComputedStyle(elem,null).getPropertyValue('display'),
                    classname = elem.className.split(/ /g),
                    nclassname = '',
                    i = 0
                
                switch(display){
                    case 'none':
                        if(/(delay)/g.test(elem.className)){
                            for(i = 0; i < classname.length; i++){
                                if(!/(delay)/g.test(classname[i])){
                                    nclassname += classname[i]+' '
                                }
                            }
                            elem.className = nclassname
                        }
                        elem.style.display = 'block'
                        break
                    default:
                        elem.style.display = 'none'
                        break
                }
            })
        }
    }
    initPageEvent(){
        if(this.pageElemements.length > 0){
            this.pageElemements.on('touchstart',function(e){
                e.stopPropagation()
                e.preventDefault()
                let now = parseInt($(this)[0].attributes['yh-page'].value),
                    od = 'down'
                if(now != PM.data.now){
                    PM.data.direction.y = "up"
                    if(now < PM.data.now){
                        PM.data.direction.y = "down"
                        od = 'up'
                    }
                    PM.data.last = PM.data.now
                    PM.data.now = now
                    PM.data.clickStatus = true
                    PM.pageMove(od,PM)
                }
            })
        }
    }
    initHrefEvent(){
        if(this.hrefElemements.length > 0){
            this.hrefElemements.on('touchstart',function(e){
                e.stopPropagation()
                e.preventDefault()
                
                window.location.href = $(this).attr('yh-href')
            })
        }
    }
}

initYHEvent()
function initYHEvent(){
    let elem = null,
        href = [],
        status = false
    console.log(elementsEvent)
    for(let id in elementsEvent){
        elem = document.getElementById(id)
        href = elementsEvent[id].href.split('-')
        switch(elementsEvent[id].entype){
            case 'href':
                elem.setAttribute('yh-href',href[0])
                break
            default:
                elem.setAttribute('yh-'+href[0],href[1])
                break
        }
        status = true
    }
    if(status){
        new YHEvent()
    }
}