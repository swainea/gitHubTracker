(function(ns) {
  'use strict';

  ns.userToken = ""; //we dont want this on the NS
  ns.userData = {}; //we dont want this on the NS

/**
 * [getData description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */

  function getData(callback) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataType: 'json',
      headers: {
              Authorization: "token " + ns.userToken
            },
      success: function (data){
        console.log(data);
        ns.userData = data;
        callback();
      },
      error: function (){
        alert('Please enter a valid GitHub Token');
      }
    });
  }

  /**
   * [getData description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */

  $('#login').submit(function loginWithToken(event){
    event.preventDefault();
    ns.userToken = $('#userToken').val();

    var nextView = $(this).attr('action');
    getData(function dataSuccessful (){
      window.location.hash = nextView;
      $('#login').hide();
    });

  });

  window.ght = ns;
})(window.ght || {});

(function(ns) {
  'use strict';

  window.addEventListener('hashchange', function hashNav() {
         doNav();
     });

  function doNav(){
    $('.view').hide();
    var newView = $( window.location.hash ).show();

    $('nav li').removeClass('active');
    $('nav a[href="' + window.location.hash + '"]').closest('li').addClass('active');

    if (newView.length === 0) {
            window.location.hash = '#login';
    } else {
      var viewName = window.location.hash.substr(1); 
           if (ns[viewName] && ns[viewName].load) {
               ns[viewName].load();
           }
       }
  }

ns.init = function() {
        doNav();
    };

  window.ght = ns;
})(window.ght || {});

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
        userRepos.forEach(function(element){
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

(function(ns) {
  'use strict';

  ns.profile = {};

  //might need a function that clears the HTML

  ns.profile.load = function load() {
    console.log('loading profile view');
    console.log(ns.userData.login);
      $('#profile')
        .append( $('<ul>')
          .append( $('<li>').text("Username: " + ns.userData.login))
          .append( $('<li>').text("Name: " + ns.userData.name))
          .append( $('<li>').text("Repos: " + ns.userData.public_repos))
          .append( $('<li>').text("Followers: " + ns.userData.followers))
          .append( $('<li>').text("Account created: " + ns.userData.created_at)) //need to convert this date
        );
      $('#profile')
        .append($('<img>',{id:'userAvatar',src: ns.userData.avatar_url})
      );
  };

  window.ght = ns;
})(window.ght || {});
