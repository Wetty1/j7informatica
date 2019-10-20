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
    $('.field__register input').on('focus',function(){
        $(this).addClass('focus')
    })
    
    $('.field__register input').on('blur',function(){
        if($(this).val() == '')
        $(this).removeClass('focus')
    })
})