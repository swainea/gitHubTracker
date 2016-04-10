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
      // error: function (){
      //   alert('Please enter a valid GitHub Token');
      //   this error function will need to be completed
      // }
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

// call the function from repos and render the data in this view 


  window.ght = ns;
})(window.ght || {});

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
            .append($('<tr><td>' + data[i].full_name + i + '</td><td>' + data[i].stargazers_count + '</td><td>' + data[i].open_issues_count + '</td></tr>'));
      }
  };

  // on click we need a hash change, view change to repoDetails and to kick off a for each loop
  // write a function here that will loop across the repoData and grab the necessary information for repo details
  // it will need to be on the NS and called from the repo detail module.
  // on click you will need to have the hashchange redirect the view
  $( "#target" ).click(function getRepoDetails() {
    var nextView = $(this).attr('action');
    getRepos(function getReposSuccessful (repoData){
      window.location.hash = nextView;
      console.log(repoData);
    }); 
  });

  window.ght = ns;

})(window.ght || {});

(function(ns) {
  'use strict';
  ns.profile = {};

  ns.profile.load = function load() {
      $('#profile').empty();
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