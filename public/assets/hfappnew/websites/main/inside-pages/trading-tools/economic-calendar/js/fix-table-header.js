function UpdateTableHeaders() {
    $(".persist-area").each(function() {
    
        var el             = $(this),
            offset         = el.offset(),
            scrollTop      = $(window).scrollTop(),
            floatingHeader = $(".floatingHeader", this)
        
        // fix header width
        $('.floatingHeader th').width($('#fxst-calendartable').width());
        
        if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
            floatingHeader.css({
             "visibility": "visible"
            });
        } else {
            floatingHeader.css({
             "visibility": "hidden"
            });      
        };
    });
 }
 
 // DOM Ready      
$(window).on('load', function(){

    var clonedHeaderRow;
     
     $('#fxst-calendartable').addClass('persist-area');
     $('.fxst-calendarhead').addClass('persist-header'); 

    $(".persist-area").each(function() {
        
        clonedHeaderRow = $(".persist-header", this);
        clonedHeaderRow
          .before(clonedHeaderRow.clone())
          .css("width", clonedHeaderRow.width())
          .addClass("floatingHeader");
          
    });
    
    $(window)
     .scroll(UpdateTableHeaders)
     .resize(UpdateTableHeaders)
     .trigger("scroll");
    
 });