(function(ns) {
  'use strict';

  ns.repos = {};
  var repoData = [];

  function getRepos(callback) {
    if (repoData.length > 0){
      callback(repoData);
      return;
    }
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user/repos',
      dataType: 'json',
      headers: {
              Authorization: "token " + ns.userToken
            },
      success: function (data){
        repoData = data;
        callback(repoData);
      },
      // error: function (){
      //   alert('Please login first');
      // }
    });
  }

  ns.repos.load = function load() {
      getRepos(function reposSuccessful(userRepos) {
        ns.renderRepos(userRepos);
      });
  };
  ns.renderRepos = function renderRepos(data,i){
    $('#repos').empty();
    $('#repos')
        .append($('<table>')
            .append($('<thead>')
                .append($('<tr><th>' + 'Name' + '</th><th>' + 'Stars' + '</th><th>' + 'Open Issues' + '</th></tr>') )
            )
        );
    $('#repos table')
          .append($('<tbody>').attr('id', 'repoTableData'));
      for(i=0; i<data.length; i++){
        $('#repoTableData')
            .append($('<tr><td>' + '<a class = "repoLink" + href='+ '#repoDetails' + '>' + data[i].full_name + '</a>' + '</td><td>' + data[i].stargazers_count + '</td><td>' + data[i].open_issues_count + '</td></tr>'));
      }
  };

  // on click we need a hash change, view change to repoDetails and to kick off a for each loop
  // write a function here that will loop across the repoData and grab the necessary information for repo details
  // it will need to be on the NS and called from the repo detail module.
  // on click you will need to have the hashchange redirect the view
  $( ".repoLink" ).click(function getRepoDetails() {
    event.preventDefault();
    var nextView = $(this).attr('action');
    getRepos(function getReposSuccessful (repoData){
      // ns.renderRepoDetail(userRepos); 
      window.location.hash = nextView;
      console.log(repoData);
    });
  });

  window.ght = ns;

})(window.ght || {});
