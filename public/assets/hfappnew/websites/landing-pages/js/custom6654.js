$(document).ready(function(){

    $(document).ready(function() {
        $("#js-riskMinimizeButton").click(function() {
          $("#js-riskMinimizeButton").toggleClass('up-rw');
          if($(".rwsmall").hasClass("show-rw")){
              $(".rwsmall").removeClass("show-rw");
              $(".rwnormal").removeClass("hide-rw");
          }
          else{
              $(".rwsmall").addClass("show-rw");
              $(".rwnormal").addClass("hide-rw");
          }
        });
    });

});


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
	if($('#myDropdown').css('display')=='block'){
		$('#myDropdown').hide();
	}else{
		$('#myDropdown').show();
	}
    //document.getElementById("myDropdown").classList.toggle("show");
}

$(document).mouseup(function (e)
{
    var container = $(".dropbtn");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $('#myDropdown').hide();
    }
});


function openRegulator() {
    if($('#myDropdownSec').css('display')=='block'){
        $('#myDropdownSec').hide();
    }else{
        $('#myDropdownSec').show();
    }
    //document.getElementById("myDropdown").classList.toggle("show");
}

$(document).mouseup(function (e)
{
    var container = $(".dropbtn");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        $('#myDropdownSec').hide();
    }
});
