(function(ns) {
  'use strict';
  ns.reposDetail = {};


  ns.reposDetail.load = function load ( repo ){
    console.log('inside load function');
    console.log("Requested Repo",repo);
    ns.repoData.forEach(function ( repoData ){
      // console.log("Repo Name:", repoData.name);
      if ( repo === repoData.name ){
        console.log('working');
        ns.renderRepoDetails( repoData );
      }
    });
  };

    ns.renderRepoDetails = function renderRepoDetails( repoData ){
       $('#reposDetail').empty();
       console.log('Inside Repo Details');
       ns.repoDetailNav();
       $( '#reposDetail')
         .append( $( 'ul' )
           .append( $('li').text( repoData.forks))
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
