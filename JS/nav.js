(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav() {
         doNav();
     });

  function doNav(){
    console.log("I'm headed to ..." + window.location.hash);
    // need to hide elements from login and show profile elements here 
  }

  window.ght = ns;
})(window.ght || {});
