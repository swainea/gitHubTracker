(function(ns) {
  'use strict';

  ns.repos = {};
  var userRepos = [];
  var repoData = [];

  function getRepos(callback) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user/repos',
      dataType: 'json',
      headers: {
              Authorization: "token " + ns.userToken
            },
      success: function (data){
        userRepos = data;
        callback();
      },
      error: function (){
        alert('Please login first');
      }
    });
  }

  ns.repos.load = function load() {
      getRepos(function reposSuccessful() {
        console.log(userRepos);
        forEach(function(element){
          repoData.push ( { name: element.full_name, stars: element.stargazers_count, openIssues: element.open_issues_count} );
          console.log(repoData);
          // gitHubOrgs.renderItem( userData[userData.length-1] );
        });
      });
  };
      // $('#profile').append(
      //     '<p>This is the ARTICLE. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
      // );

  window.ght = ns;

})(window.ght || {});
