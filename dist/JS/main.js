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
        callback(data);
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

      // {
      //   profile: 'bar'
      // }
      //
      // var foobar = 'profile';
      // ns[foobar]  === ns['profile'] === ns.profile

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

//# sourceMappingURL=main.js.map