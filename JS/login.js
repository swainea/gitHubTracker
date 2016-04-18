(function(ns) {
  'use strict';

  ns.userToken = "";
  ns.userData = {};

  $('.nav').hide();

  function getData(token, callback) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataType: 'json',
      headers: {
              Authorization: "token " + token
            },
      success: function (data){
        console.log(data);
        // now we know the  token is valid
        ns.userToken = token;
        ns.userData = data;
        callback(data);

      },
      error: function (){
        callback(null);
      }
    });
  }

  $('#login').submit(function loginWithToken(event){
    event.preventDefault();
    $('.nav').hide(); //check this
    // ns.userToken = $('#userToken').val();
    var nextView = $(this).attr('action');
    getData($('#userToken').val(), function dataSuccessful (data) {
      if (data){
        window.location.hash = nextView;
        $('#login').hide();
        $('.nav').show();
      } else {
        console.log('login failed!');
        // other UI things
      }

    });  // end of getData

    // any code here would execute BEFORE our callback above

  });

  window.ght = ns;
})(window.ght || {});
