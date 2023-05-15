$(document).ready(function()
    { $('body,html').animate({
        scrollTop: 0
    }, 600);

    $('#paging_container3').pajinate({
        start_page : 0,
        items_per_page : 15,
        pageRange: 5,
        pageNumber: 5,
        pageSize: 5,
        item_container_id : '.alt_content',
        nav_panel_id : '.alt_page_navigation',
        jquery_ui : false,
        triggerPagingOnInit : false,
        thumbs: {
        autoStart: true, // Display thumbnails on opening
        },
    });
});

//$("[data-fancybox]").fancybox({
//    thumbs : {
//        autoStart : true
//    }
//});
//$('[data-fancybox="gallery"]').fancybox({
//	thumbs : {
//		autoStart : true
//	}
//});