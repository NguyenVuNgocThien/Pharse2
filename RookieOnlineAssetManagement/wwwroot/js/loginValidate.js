$("input").on("input",function () {
    var disableLogin = $('#inputUsername').val().length * $('#inputPassword').val().length > 0;
    $('button[type="submit"]').prop('disabled', !disableLogin);
}) 