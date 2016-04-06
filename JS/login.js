(function(ns) {
  'use strict';

  ns.userToken = "";
  ns.userData = {}; // should this be an object or an array? the data returned from API is an object

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
        console.log('ajax complete');
      },
      error: function (data){
        alert('Please enter a valid GitHub Token');
      }
    });
  }

  $('#submitToken').submit(function loginWithToken(event){
    event.preventDefault();
    ns.userToken = $('#userToken').val();
    console.log(ns.userToken);
    var nextView = $(this).attr('action'); // this needs to happen upon completetion of the ajax request, right now it is happening before the request finishes
    console.log('inside event handler', nextView);
    getData(function dataSuccessful (data){
      window.location.hash = nextView;
      //this is where I call a function that hides the login in the UI
    });
    console.log('after getData is called');

  });

  window.ght = ns;
})(window.ght || {});
