(function(ns) {
  'use strict';
  ns.repoDetails = {};

  ns.repoDetails.load = function load() {
        $('#repoDetails').empty();
        $('#repoDetails')
           .append( $('<ul>')
             .append( $('<li>').text("Username: " + "Liz"))
        );
        //
    };


  window.ght = ns;
})(window.ght || {});
