(function(ns) {
  'use strict';
  ns.reposDetail = {};

  ns.reposDetail.load = function load() {
      $('#reposDetail').empty();
      repoDetailNav();
        $('#reposDetail')
           .append( $('<ul>')
             .append( $('<li>').text("Page Under Construction"))
        );
    };

    function repoDetailNav(){
      $('.nav')
          .append($('<li>')
             .append($('<a>').attr('href','#repoDetails').text('Repo Detail')
           )
      );
    }

  window.ght = ns;
})(window.ght || {});
