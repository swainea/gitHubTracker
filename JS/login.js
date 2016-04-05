(function(ns) {
  'use strict';

  ns.userToken = "";

  $('#submitToken').submit(function loginWithToken(event){
    event.preventDefault();
    console.log('login success');
    ns.userToken = $('#userToken').val();
    console.log(ns.userToken);

    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataType: 'json',
      headers: {
              Authorization: "token " + ns.userToken
            },
      success: function (data){
        console.log(data);
      },
      error: function (data){
        alert('oh no!');
      }
    });
  });

  window.ght = ns;
})(window.ght || {});
