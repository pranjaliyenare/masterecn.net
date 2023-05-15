$( document ).ready(function() {

    $('.button-sentences').on('click', function(event) {
        $(event.target).closest('.reg-description').toggleClass('active');
    });

});