$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$("#menu-toggle").click(function(){
    // $(this).toggleClass('fa-stream')
    $(this).toggleClass('fa-chevron-circle-right')
})
