$(function() {
    $('form :input').on('input', function(e) {
        var text = e.target.value;
        var regex = /[^\u0000-\u007f]/;
        var containsNonLatin = regex.test(text);

        var invalidName = false;
        if (($(this).attr("id") == "id_first_name") || ($(this).attr("id") == "id_last_name")) {
            var nameRegex = /^[a-zA-Z@ -]*$/;
            invalidName = !nameRegex.test(text);
        };

        if (containsNonLatin || invalidName) {
            $(this).parent().parent().find("p").remove();
            $(this).parent().append("<p style='color:red'>Please use only latin characters</p>");
            $(this).addClass('invalid-field');
            $(":submit").attr("disabled", true).css("background-color", "");
            $(":submit").removeClass("btn-red form-control");
            $(":submit").addClass("btn-disabled");
        } else {
            $(this).parent().parent().find("p").remove();
            $(this).removeClass('invalid-field');

            // Activate button only if there are not any other invalid fields
            if(!document.querySelector(".invalid-field")) {
                $(":submit").attr("disabled", false).css("background-color", "#cd0511");
                $(":submit").addClass("btn-red form-control");
                $(":submit").removeClass("btn-disabled");
            }
        }
    });
});