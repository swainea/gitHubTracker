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
    console.log('after getData is called');

  });

  window.ght = ns;
})(window.ght || {});

(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav() {
         doNav();
     });

  function doNav(){
    $('.view').hide();
         var newView = $( window.location.hash ).show();

         $('nav li').removeClass('active');

         $('nav a[href="' + window.location.hash + '"]').closest('li').addClass('active');

         if (newView.length === 0) {
             // if they try to load a bad view, default to view-1!
             window.location.hash = '#view-1';
         } else {
             // do stuff the view needs

             var viewName = window.location.hash.substr(1);
             if (ns[viewName] && ns[viewName].load) {
                 // ns['view-1'].load();
                 ns[ viewName ].load();
             }
         }
     }

  ns.init = function() {
        doNav();
    };

  window.ght = ns;
})(window.ght || {});

(function(ns) {
  'use strict';

  // ns['profile'] = {};
  //
  //     ns['profile'].load = function load() {
  //         // Do an ajax call to get article data
  //         $('#profile').append(
  //             '<p>This is the ARTICLE. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
  //         );
  //     };

  window.ght = ns;
})(window.ght || {});
