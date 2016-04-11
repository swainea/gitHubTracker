(function(ns) {
  'use strict';

  ns.userToken = "";
  ns.userData = {};

  $('.nav').hide();

  function getData(callback) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataType: 'json',
      headers: {
              Authorization: "token " + ns.userToken
            },
      success: function (data){
        console.log(data);
        ns.userData = data;
        callback(data);
        $('.nav').show();
      },
      error: function (){
        return('Please enter a valid GitHub Token');
      }
    });
  }

  $('#login').submit(function loginWithToken(event){
    event.preventDefault();
    $('.nav').hide();
    ns.userToken = $('#userToken').val();
    var nextView = $(this).attr('action');
    getData(function dataSuccessful (){
      window.location.hash = nextView;
      $('#login').hide();
    });
  });

  window.ght = ns;
})(window.ght || {});
