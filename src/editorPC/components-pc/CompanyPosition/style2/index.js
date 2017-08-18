let companyPositionStyle2 = $('[yh-module="CompanyPosition_style2"]')

companyPositionStyle2.on('mouseenter',function(e){
    $(this).children('.slideLayer').removeClass('hide').stop().animate({
        top:0
    },500)
})

companyPositionStyle2.on('mouseleave',function(e){
    let slideLayer = $(this).children('.slideLayer')
    slideLayer.stop().animate({
        top:'100%'
    },500,function(){
        slideLayer.addClass('hide')
    })
})
