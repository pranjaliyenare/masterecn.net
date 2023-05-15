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

//
// Detect seminar date selection
//
$(document).on('change', '#semdate, #semdate2', function(){
    // get user selected date
    var seminar_id = $(this).val();
	change_view(seminar_id)
	
	template = $('#tmp_date_selection_'+seminar_id).html();
    
    rendered = Mustache.render(template, {});
	BootstrapDialog.alert({
		title: MODAL_TITLE_CONFIRM || '',
		message: rendered,
		closable: true,
        closeByBackdrop: true,
        closeByKeyboard: true,
	});
});
// END seminar selection

//
// Detect tab clicked
//
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var seminar_id = $(this).data('seminar-id');
  change_view(seminar_id);
})
// END tab clicked

function showForm(){
 $('html, body').animate({
    scrollTop: parseInt($('.registration-form').offset().top)
	}, 700);
};

function showTerms(event){
	event.preventDefault();
	template = $('#tmp_terms').html();
    rendered = Mustache.render(template, {});
	BootstrapDialog.alert({
		title: 'Door Prizes Terms & Conditions',
		message: rendered,
		closable: true,
        closeByBackdrop: true,
        closeByKeyboard: true,
	});
};

function showTermsExtraPrizes(event){
	event.preventDefault();
	template = $('#tmp_terms_extra_prizes').html();
    rendered = Mustache.render(template, {});
	BootstrapDialog.alert({
		title: 'Lucky Draw Prizes Terms & Conditions',
		message: rendered,
		closable: true,
        closeByBackdrop: true,
        closeByKeyboard: true,
	});
};

function change_view(seminar_id) {
	if (seminar_id) {
		// change select boxes value
		$('#semdate').val(seminar_id);

		$('#semdate2').val(seminar_id);

		// change tab display
		$('a[href="#venue-'+seminar_id+'"]').tab('show');

		// change schedule display
		$('[data-seminar-schedule]').hide();

		$('[data-seminar-schedule="'+seminar_id+'"]').show();

		// change speaker display
		$('[data-seminar-speaker]').hide();

		$('[data-seminar-speaker="'+seminar_id+'"]').show();

		// change prizes display
		$('[data-seminar-prizes]').hide();

		$('[data-seminar-prizes="'+seminar_id+'"]').show();
	};
};

