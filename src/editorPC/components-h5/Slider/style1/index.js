let sliderStyle1 = $('[yh-module="Slider_style1"]'),
sliderStyle1Swiper = {}

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
    autoplay = parseInt(sliderStyle1.eq(i).attr('autoplay'))
    autoplay = autoplay ? true : false
    content = sliderStyle1.eq(i).find('#'+id+'-content')
    childs = content.children()
    length = childs.length
    first = childs.eq(0)
    first.clone(true).appendTo(content)
    content.css('left',0)
    sliderStyle1Swiper[id] = {
        width:first.children().eq(0).width(),
        currentIndex:0,
        length:length
    }
}
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
initSliderStyle1Animate();
