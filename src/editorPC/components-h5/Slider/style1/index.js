let sliderStyle1 = $('[yh-module="Slider_style1"]'),
    sliderStyle1Swiper = {}

function initSliderStyle1Animate(){
    let i = 0,
        autoplay = false,
        animation = 'move',
        id = ''
    for(i = 0; i < sliderStyle1.length; i++){
        id = sliderStyle1.eq(i).attr('id')
        autoplay = parseInt(sliderStyle1.eq(i).attr('autoplay'))
        autoplay = autoplay ? true : false
        sliderStyle1Swiper[id] = {
            
        }
    }
}
initSliderStyle1Animate();
