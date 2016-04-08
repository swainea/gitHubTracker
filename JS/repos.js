(function(ns) {
  'use strict';

  ns.repos = {};

  function getRepos(callback) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user/repos',
      dataType: 'json',
      headers: {
              Authorization: "token " + ns.userToken
            },
      success: function (data){
        callback(data);
      },
      error: function (){
        alert('Please login first');
      }
    });
  }

  ns.repos.load = function load() {
      getRepos(function reposSuccessful(userRepos) {
        var repoData = [];
        console.log(userRepos);
        userRepos.forEach(function(element){
          repoData.push ( { name: element.full_name, stars: element.stargazers_count, openIssues: element.open_issues_count} );
          console.log(repoData);
        });

        ns.renderRepos(repoData);

      });
  };
  ns.renderRepos = function renderRepos(data,i){
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
  .append($('<tr><td>' + data[i].name + i + '</td><td>' + data[i].stars + '</td><td>' + data[i].openIssues + '</td></tr>'));
}
};
  window.ght = ns;

})(window.ght || {});
