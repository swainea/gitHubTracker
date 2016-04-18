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
        ns.repoDetailNav( repoData );
      }
    });
  };

    ns.renderRepoDetails = function renderRepoDetails( repoData ){
      $('#reposDetail').empty();
       console.log('Inside Repo Details');
       $( '#reposDetail')
           .append( $('p').text( repoData.forks));
    };

    ns.repoDetailNav = function repoDetailNav( repoData ){
      //nav tab is being duplicated each time the page loads 

      // console.log('Inside Repo Detail Nav');
      // console.log('Repo Data reaching Nav:', repoData);
      $('.nav')
          .append($('<li>')
             .append($('<a href="#reposDetail__' + repoData.name + ' class="active" ">' + 'Repo Detail' + '</a>') //try also adding the aria if this works
            )
          );
    };

  window.ght = ns;
})(window.ght || {});
