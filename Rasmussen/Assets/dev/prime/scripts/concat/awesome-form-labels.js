$(function () {

    $('.awesome-form .form-input--awesome, .awesome-form .form__input--awesome').focusout(function () {

        var text_val = $(this).val();

        if (text_val === "") {

            $(this).removeClass('has-value');

        } else {

            $(this).addClass('has-value');

        }

    });

});
