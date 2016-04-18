(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav() {
         doNav();
     });

  function doNav(){
    $('.view').hide();
    console.log('showing', window.location.hash);
    var viewName = window.location.hash.substr(1).split('__');
    $( '#' + viewName[0] ).show();


    $('nav li').removeClass('active');
    $('nav a[href="' + '#' + viewName[0] + '"]').closest('li').addClass('active');
    // I cannot tell if this is right for my tabs

    if (!ns.userToken){
            window.location.hash ='#login';
    } else {
      window.location.hash.substr(1).split('__');
      //there might be a better way to do this .split
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
