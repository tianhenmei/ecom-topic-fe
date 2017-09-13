let sliderStyle1 = $('[yh-module="Slider_style1"]'),
    sliderStyle1Swiper = {},
    sliderStyle1SwiperAni = {},
    isAppendSliderStyle1 = 0,
    browserType = 0

function loadSliderStyle1Swiper(){
    browserType = sliderStyle1CheckBrower()
    switch (browserType) {
        case 0:  // Opera浏览器
        case 1:  // Firefox浏览器
        case 2:  // Chrome浏览器
        case 3:  // Safari浏览器
            addCssByLink('https://www.lgstatic.com/topic/css/swiper.min.css', dealAppendSliderStyle1);
            addScript('https://www.lgstatic.com/topic/js/swiper.min.js', dealAppendSliderStyle1);
            break;
        case 6:  // IE浏览器
            animationStatus = true;
            // lunAnimation(browserType);
            break;
        case 4:  // IE9.0及以上浏览器
        case 5:
        default:
            addCssByLink('https://www.lgstatic.com/topic/css/idangerous.swiper.css', dealAppendSliderStyle1);
            addScript('https://www.lgstatic.com/topic/js/idangerous.swiper.min.js', dealAppendSliderStyle1);
            break;
    }
}

function dealAppendSliderStyle1() {
    isAppendSliderStyle1++;

    if (isAppendSliderStyle1 == 2) {
        // animationStatus = true;
        initSliderStyle1Animate()
        // if (movieElem.length > 0 && movieElem.attr('movie_type') == 'local') {
        //     getMovie();
        // }
        // 添加轮播动画
        // lunAnimation(browserType);
    }
}

function addCssByLink(url, callback) {
    var doc = document;
    var link = doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);

    var heads = doc.getElementsByTagName("head");
    if (heads.length)
        heads[0].appendChild(link);
    else
        doc.documentElement.appendChild(link);
    link.onload = function() {
        callback(); //dealAppend();
    }
}

function addScript(url, callback) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    var heads = document.getElementsByTagName("head");
    if (heads.length)
        heads[0].appendChild(script);
    else
        document.documentElement.appendChild(script);
    script.onload = function() {
        callback(); //dealAppend();
    }
}

function sliderStyle1CheckBrower() {
    var userAgent = window.navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    var browserType = 0;
    if (isOpera) { //判断是否Opera浏览器
        browserType = 0;
    } else if (userAgent.indexOf("Firefox") > -1) { //判断是否Firefox浏览器
        browserType = 1;
    } else if (userAgent.indexOf("Chrome") > -1) { //判断是否Chrome浏览器
        browserType = 2;
    } else if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
        browserType = 3;
    } else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) { //判断是否IE浏览器
        /*if(userAgent.match(/6./i)=="6."){
            browserType = 6;
            }else if(userAgent.match(/7./i)=="7."){
            browserType = 6;
            }else if(userAgent.match(/8./i)=="8."){
            browserType = 6;
            }*/
        if (userAgent.match(/9./i) == "9." || userAgent.match(/10./i) == "10.") {
            browserType = 4;
        } else {
            browserType = 6;
        }
    } else if (userAgent.toLowerCase().indexOf("trident") > -1 && userAgent.indexOf("rv") > -1) {
        browserType = 5;
    }

    return browserType;
}

function initSliderStyle1Animate(){
    let i = 0,
        autoplay = false,
        animation = 'move',
        id = '',
        content = null,
        childs = null,
        first = null,
        length = 3
    for(i = 0; i < sliderStyle1.length; i++){
        id = sliderStyle1.eq(i).attr('id')
        autoplay = sliderStyle1.eq(i).attr('autoplay')
        autoplay = autoplay ? true : false
        animation = sliderStyle1.eq(i).attr('animation')
        animation = animation ? animation : 'move'

        content = sliderStyle1.eq(i).find('#'+id+'-content')
        childs = content.children()
        length = childs.length
        first = childs.eq(0)
        // first.clone(true).appendTo(content)
        content.css('left',0)
        sliderStyle1Swiper[id] = {
            width:first.children().eq(0).width(),
            currentIndex:0,
            length:length,
            autoplay:autoplay,
            animation:animation,
            // pagination_color:$('#'+id+'-pagination > div').eq(0).css('background-color')
        }
        
        switch (browserType) {
            case 0:
            case 1:
            case 2:
            case 3:
                switch(animation){
                    case 'zoomIn':
                        initSliderStyle1ZoomIn(id)
                        break
                    default:
                        initSliderStyle1Move(id)
                        break
                }
                break
            case 4:
            case 5:
            case 33: // safri
                initSliderStyle1Move(id)
                break
            default:
                initSliderStyle1JQuery(id)
                break
        }
    }
}

function initSliderStyle1Move(id){
    let pagination = $('#'+id+'-pagination').children(),
        content = $('#'+id+'-content'),
        container = $('#'+id+'-container'),
        length = pagination.length,
        totalLength = 3
    content.attr('style','left:0;')
    sliderStyle1SwiperAni[id] = new Swiper('#'+id+'-container', {
        wrapperClass : 'yh-slider-content',
        slideClass : 'block-style1',
        autoplay: sliderStyle1Swiper[id].autoplay ? 3000 : 0,//可选选项，自动滑动
        loop : true,
        // loopedSlides:1,
        // pagination : '#'+id+'-pagination',
        paginationClickable:true,
        bulletClass:'one',
        bulletActiveClass:'active',
        prevButton:'#'+id+'-arrow-left',
        nextButton:'#'+id+'-arrow-right',
        // paginationElement:'span',
        // paginationBulletRender: function (swiper, index, className) {
        //     return '<span class="' + className + '" style="background-color:'+sliderStyle1Swiper[id].pagination_color+';"></span>';
        // },
        onInit:function(swiper){
            totalLength = $('#'+id+'-pagination').children().length
            // $('#'+id+'-pagination').children().css('background-color',sliderStyle1Swiper[id].pagination_color)
        },
        onSlideChangeEnd: function(swiper) {
            // var ul = $(elemClass).children(),
                // li = ul.children('li'),
                // activeLi = ul.children('.' + this.slideActiveClass).length > 0 ? ul.children('.' + this.slideActiveClass) : ul.children('.active'),
                // index = activeLi.index(),
            let index = swiper.activeIndex,
                // id = ul.attr('id'),
                // logo = $('.' + id + 'Button').children('img'),
                endIndex = index - 1;
            if (endIndex == -1) {
                endIndex = length - 1;
            } else if (endIndex == totalLength) {
                endIndex = 0;
            }
            pagination.removeClass('active').eq(endIndex).addClass('active');
            // li.eq(index).removeClass('active').end().eq(index).addClass('active');
        }
    })
}

function initSliderStyle1ZoomIn(id){
    let pagination = $('#'+id+'-pagination').children(),
        length = pagination.length,
        totalLength = 3
    sliderStyle1SwiperAni[id] = new Swiper('#'+id+'-container', {
        wrapperClass : 'yh-slider-content',
        slideClass : 'yh-slider-slide',
        autoplay: sliderStyle1Swiper[id].autoplay ? 3000 : 0,//可选选项，自动滑动
        // loop : true,
        // loopedSlides:1,
        // pagination : '#'+id+'-pagination',
        paginationClickable:true,
        bulletClass:'one',
        bulletActiveClass:'active',
        prevButton:'#'+id+'-arrow-left',
        nextButton:'#'+id+'-arrow-right',
        // paginationElement:'span',
        // paginationBulletRender: function (swiper, index, className) {
        //     return '<span class="' + className + '" style="background-color:'+sliderStyle1Swiper[id].pagination_color+';"></span>';
        // },
        mode: 'horizontal',
        paginationClickable: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1.56,
        initialSlide: 1,
        autoplayDisableOnInteraction: false,
        // prevButton: '.' + id + 'Pre',
        // nextButton: '.' + id + 'Next',
        coverflow: {
            rotate: 0,
            stretch: 350,
            depth: 300,
            modifier: 1,
            slideShadows: true
        },
        onInit:function(swiper){
            totalLength = $('#'+id+'-pagination').children().length
            pagination.removeClass('active').eq(1).addClass('active')
            // $('#'+id+'-pagination').children().css('background-color',sliderStyle1Swiper[id].pagination_color)
        },
        onSlideChangeEnd: function(swiper) {
            // var ul = $(elemClass).children(),
                // li = ul.children('li'),
                // activeLi = ul.children('.' + this.slideActiveClass).length > 0 ? ul.children('.' + this.slideActiveClass) : ul.children('.active'),
                // index = activeLi.index(),
            let index = swiper.activeIndex,
                // id = ul.attr('id'),
                // logo = $('.' + id + 'Button').children('img'),
                endIndex = index //index - 1;
            if (endIndex == -1) {
                endIndex = length - 1;
            } else if (endIndex == totalLength) {
                endIndex = 0;
            }
            pagination.removeClass('active').eq(endIndex).addClass('active');
            // li.eq(index).removeClass('active').end().eq(index).addClass('active');
        }
    })
}

function initSliderStyle1JQuery(id){
    let pagination = $('#'+id+'-pagination').children(),
        prevButton = $('#'+id+'-arrow-left'),
        nextButton = $('#'+id+'-arrow-right'),
        content = $('#'+id+'-content'),
        container = $('#'+id+'-container'),
        length = pagination.length

    prevButton.show()
    nextButton.show()
    content.children().eq(0).clone(true).appendTo(content)
    container.css({
        'width':sliderStyle1Swiper[id].width+'px',
        // 'margin-left':sliderStyle1Swiper[id].width / 2 * -1 +'px'
    })
    // content.css('width',sliderStyle1Swiper[id].width+'px')
    content.attr('style','left:0;')
    sliderStyle1Swiper[id].currentIndex = 0

    if(sliderStyle1Swiper[id].autoplay){
        sliderStyle1SwiperAni[id] = setInterval(function() {
            nextLun(); // 轮播
        }, 3000);
    }
    prevButton.click(prevEvent)
    nextButton.click(nextLun)

    function nextLun(e){
        if(e){
            e.stopPropagation()
            e.preventDefault()
        }
        sliderStyle1Swiper[id].currentIndex++
        let endIndex = sliderStyle1Swiper[id].currentIndex
        if (endIndex == length) {
            endIndex = 0;
        }
        content.animate({
            'left':sliderStyle1Swiper[id].width * sliderStyle1Swiper[id].currentIndex * -1+'px'
        },function(){
            if(sliderStyle1Swiper[id].currentIndex == sliderStyle1Swiper[id].length){
                sliderStyle1Swiper[id].currentIndex = 0
                content.css({
                    'left':0
                })
            }
        })
        pagination.removeClass('active').eq(endIndex).addClass('active');
    }

    function prevEvent(e){
        e.stopPropagation()
        e.preventDefault()

        sliderStyle1Swiper[id].currentIndex--
        if (sliderStyle1Swiper[id].currentIndex == -1) {
            sliderStyle1Swiper[id].currentIndex = length - 1
            content.css({
                'left':sliderStyle1Swiper[id].length * sliderStyle1Swiper[id].width * -1 + 'px'
            })
        }
        let endIndex = sliderStyle1Swiper[id].currentIndex
        content.animate({
            'left':sliderStyle1Swiper[id].width * sliderStyle1Swiper[id].currentIndex * -1+'px'
        })
        pagination.removeClass('active').eq(endIndex).addClass('active');
    }
}

function initSliderStyle1Move2(){
    sliderStyle1.on('click','.arrow-left',function(e){
        let slider = $(this).closest('[yh-module="Slider_style1"]'),
            id = slider.attr('id')
        sliderStyle1Swiper[id].currentIndex--
        if(sliderStyle1Swiper[id].currentIndex == -1){
            sliderStyle1Swiper[id].currentIndex = sliderStyle1Swiper[id].length - 1
            $('#'+id+'-content').css({
                'left':sliderStyle1Swiper[id].length * sliderStyle1Swiper[id].width * -1 + 'px'
            })
        }
        $('#'+id+'-content').animate({
            'left':sliderStyle1Swiper[id].width * sliderStyle1Swiper[id].currentIndex * -1+'px'
        })
    })
    sliderStyle1.on('click','.arrow-right',function(e){
        let slider = $(this).closest('[yh-module="Slider_style1"]'),
            id = slider.attr('id')
        sliderStyle1Swiper[id].currentIndex++
        $('#'+id+'-content').animate({
            'left':sliderStyle1Swiper[id].width * sliderStyle1Swiper[id].currentIndex * -1+'px'
        },function(){
            if(sliderStyle1Swiper[id].currentIndex == sliderStyle1Swiper[id].length){
                sliderStyle1Swiper[id].currentIndex = 0
                $('#'+id+'-content').css({
                    'left':0
                })
            }
        })
    })
}



loadSliderStyle1Swiper();
