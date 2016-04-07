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
        console.log(ns.userData);
        callback();
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
            window.location.hash = '#login';
    } else {
      var viewName = window.location.hash.substr(1); 
           if (ns[viewName] && ns[viewName].load) {
               ns[viewName].load();
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


      

  window.ght = ns;
})(window.ght || {});

(function(ns) {
  'use strict';

  console.log(ns.userData);

  ns.profile = {};

  //might need a function that clears the HTML
  
  ns.profile.load = function load() {
    console.log('loading profile view');
    console.log(ns.userData.login);
      $('#profile')
        .append( $('<ul>')
          .append( $('<li>').text("Username: " + ns.userData.login))
          .append( $('<li>').text("Name: " + ns.userData.name))
          .append( $('<li>').text("Repos: " + ns.userData.public_repos))
          .append( $('<li>').text("Followers: " + ns.userData.followers))
          .append( $('<li>').text("Account created: " + ns.userData.created_at)) //need to convert this date
        );
  };

  window.ght = ns;
})(window.ght || {});
