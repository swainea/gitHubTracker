(function(ns) {
  'use strict';
  ns.reposDetail = {};

  
    ns.reposDetail.load = function load (){
      // I want to write a function to interate over the repoData
      ns.repoData forEach(function ( repoData ){
        //if the name from the split hash of the repo = particular name in the repo then do the appending
      });
    }

    ns.renderRepoDetails = function renderRepoDetails(){
       $('#reposDetail').empty();
       ns.repoDetailNav();
       $( '#reposDetail')
         .append( $( 'ul' )
           .append( $('li').text( 'Page Under Consturction'))
         );
    };

    ns.repoDetailNav = function repoDetailNav(){
      $('.nav')
          .append($('<li>')
             .append($('<a>').attr('href','#repoDetails').text('Repo Detail') //try also adding the aria if this works
           )
      );
    };

  window.ght = ns;
})(window.ght || {});
