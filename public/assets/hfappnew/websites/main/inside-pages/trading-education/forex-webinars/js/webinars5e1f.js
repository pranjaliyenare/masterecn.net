var phones = phoneArray();

$(document).ready(function(){
	// hide login form
	$('#loginNow').hide();
});

// 
// Toggle forms
//
$('body').on('click', '[data-toggle-target]', function(e){
	// prevent page from reloading
	e.preventDefault();
	
	// set variables
	var toggle_group = $(this).data('group');

	// prevent toggle if active item is clicked
	if ($(this).hasClass('active')) { return false }

	// toggle tabs active status
	$('[data-group='+toggle_group+']').toggleClass('active');

	// toggle forms visibility
	$('[data-toggle-group='+toggle_group+']').toggle();
});
// END toggle forms

//
// Display phone code on country selection
//
$('body').on('change', '#country', function(event){
    cc = $("#country option:selected").val();
    $("#phone1").val(phones[cc]);
})
// END phone display


function showForm(){
 $('html, body').animate({
    scrollTop: parseInt($('.section-registration-form').offset().top)
	}, 700);
};

