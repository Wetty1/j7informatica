// EFEITO PLACEHOLDER - PÁGINA DE LOGIN
$(document).ready(function(){
    $('.txtb input').on('focus',function(){
        $(this).addClass('focus')
    })
    
    $('.txtb input').on('blur',function(){
        if($(this).val() == '')
        $(this).removeClass('focus')
    })
})

$(document).ready(function(){
    $('.r-info input').on('focus',function(){
        $(this).addClass('focus')
    })
    
    $('.r-info input').on('blur',function(){
        if($(this).val() == '')
        $(this).removeClass('focus')
    })
})

