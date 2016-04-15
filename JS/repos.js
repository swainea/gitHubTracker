(function(ns) {
  'use strict';

  ns.repos = {};
  ns.repoData = []; // put this on the name space?? That feels wrong

  function getRepos(callback) {
    if (ns.repoData.length > 0){
      callback(ns.repoData);
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
        ns.repoData = data;
        console.log(data);
        callback(ns.repoData);
      },
      error: function (){
        callback(null);
      }
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
        .append($('<table>').attr('class', 'table table-striped table-bordered')
            .append($('<thead>')
                .append($('<tr><th> Name </th><th> Stars </th><th> Open Issues </th></tr>') )
            )
        );
    $('#repos table')
          .append($('<tbody>').attr('id', 'repoTableData'));
      for(i=0; i<data.length; i++){
        $('#repoTableData')
            .append($('<tr><td>' + '<a class = "repoLink" + href="#reposDetail__' + data[i].name + '">' + data[i].name + '</a>' + '</td><td>' + data[i].stargazers_count + '</td><td>' + data[i].open_issues_count + '</td></tr>'));
      }
  };


  window.ght = ns;

})(window.ght || {});
