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
