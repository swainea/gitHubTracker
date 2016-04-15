(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav() {
         doNav();
     });

  function doNav(){
    $('.view').hide();
    $( window.location.hash ).show();

    $('nav li').removeClass('active');
    $('nav a[href="' + window.location.hash + '"]').closest('li').addClass('active');

    if (!ns.userToken){
            window.location.hash ='#login';
    } else {
      var viewName = window.location.hash.substr(1).split('__');
      // .split('__'); // split out the repo name here but the underscores are a problem- cant split on them bc they are in repo names
      console.log(viewName);

      if (ns[viewName[0]] && ns[viewName[0]].load) {
        ns[viewName[0]].load(viewName[1]);
        console.log(viewName[1]);
      }
    }
  }

ns.init = function() {
        doNav();
    };

  window.ght = ns;
})(window.ght || {});
