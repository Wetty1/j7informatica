// EFEITO SCROLLTOPO - PAGE HOME
$(window).on('scroll',function(){
    if($(window).scrollTop()){
        $('.navbar').addClass('purple');
        $('.dropdown-item').addClass('bg-scroll-admin')
    }else{
        $('.navbar').removeClass('purple');
        $('.dropdown-item').removeClass('bg-scroll-admin')
    }
})