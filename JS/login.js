(function(ns) {
  'use strict';

  ns.userToken = ""; //we dont want this on the NS
  ns.userData = {}; //we dont want this on the NS

/**
 * [getData description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */

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
      },
      // error: function (){
      //   alert('Please enter a valid GitHub Token');
      //   this error function will need to be completed
      // }
    });
  }

  /**
   * [getData description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */

  $('#login').submit(function loginWithToken(event){
    event.preventDefault();
    ns.userToken = $('#userToken').val();
    var nextView = $(this).attr('action');
    getData(function dataSuccessful (){
      window.location.hash = nextView;
      $('#login').hide();
    });
  });

  window.ght = ns;
})(window.ght || {});
