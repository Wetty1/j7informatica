// EFEITO SCROLLTOPO - PAGE HOME
$(window).on('scroll',function(){
    if($(window).scrollTop()){
        $('.navbar').addClass('purple');
    }else{
        $('.navbar').removeClass('purple');
    }
})