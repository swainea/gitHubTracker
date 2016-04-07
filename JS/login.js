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
        callback();
        console.log('ajax complete');
      },
      error: function (){
        alert('Please enter a valid GitHub Token');
      }
    });
  }

  /**
   * [getData description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */

  $('#submitToken').submit(function loginWithToken(event){
    event.preventDefault();
    ns.userToken = $('#userToken').val();
    console.log(ns.userToken);
    var nextView = $(this).attr('action'); // this needs to happen upon completetion of the ajax request, right now it is happening before the request finishes
    console.log('inside event handler', nextView);
    getData(function dataSuccessful (){
      window.location.hash = nextView;
      //this is where I call a function that hides the login in the UI
    });

  });

  window.ght = ns;
})(window.ght || {});
