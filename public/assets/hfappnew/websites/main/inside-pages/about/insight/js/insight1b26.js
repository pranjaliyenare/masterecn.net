if ($(window).width() > 990) {
   var s = skrollr.init({
        edgeStrategy: 'set',
        easing: {
            WTF: Math.random,
            inverted: function(p) {
                return 1-p;
            }
        }
    });
}

$(window).on('resize', function(){
     if ($(window).width() < 990) {
        if(s){
            s.destroy();
        }
     }
});

function isMobile() {
    return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
}