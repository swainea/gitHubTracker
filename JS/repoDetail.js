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
      //  console.log('Inside Repo Details');
       $( '#reposDetail')
           .append($('<a href= "REPLACE_ME" >' + repoData.name + '</a>')) //the url should be dot notation
           .append( $('<p>').text( repoData.description )) // p tag not working
           .append($('<a href= "REPLACE_ME" >' + repoData.open_issues_count + ' open issues </a>')) //fix URL
           .append( $('<ul>')
              .append($('<li>').text( 'Owner: ' + repoData.owner.login ))
              .append($('<li>').text( 'Stars: ' + repoData.stargazers_count ))
              .append($('<li>').text( 'Forks: ' + repoData.forks ))
              .append($('<li>').text( 'Created On: ' + repoData.created_at ))
            );
    };

    ns.repoDetailNav = function repoDetailNav( repoData ){
      //nav tab is being duplicated each time the page loads

      // console.log('Inside Repo Detail Nav');
      $('.nav')
          .append($('<li>')
             .append($('<a href="#reposDetail__' + repoData.name + ' class="active" ">' + 'Repo Detail' + '</a>') //try also adding the aria if this works
            )
          );
    };

  window.ght = ns;
})(window.ght || {});
