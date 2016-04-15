(function(ns) {
  'use strict';

  ns.userToken = "";
  ns.userData = {};

  $('.nav').hide();

  function getData(token, callback) {
    $.ajax({
      type: 'GET',
      url: 'https://api.github.com/user',
      dataType: 'json',
      headers: {
              Authorization: "token " + token
            },
      success: function (data){
        console.log(data);
        // now we know the  token is valid
        ns.userToken = token;
        ns.userData = data;
        callback(data);

      },
      error: function (){
        callback(null);
      }
    });
  }

  $('#login').submit(function loginWithToken(event){
    event.preventDefault();
    $('.nav').hide();
    // ns.userToken = $('#userToken').val();
    var nextView = $(this).attr('action');
    getData($('#userToken').val(), function dataSuccessful (data) {
      if (data){
        window.location.hash = nextView;
        $('#login').hide();
        $('.nav').show();
      } else {
        console.log('login failed!');
        // other UI things
      }

    });  // end of getData

    // any code here would execute BEFORE our callback above

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
    $( window.location.hash ).show();

    $('nav li').removeClass('active');
    $('nav a[href="' + window.location.hash + '"]').closest('li').addClass('active');

    if (!ns.userToken){
            window.location.hash ='#login';
    } else {
      var viewName = window.location.hash.substr(1).split('__');
      // .split('__'); // split out the repo name here but the underscores are a problem- cant split on them bc they are in repo names
      console.log(viewName);

      if (ns[viewName[0]] && ns[viewName[0]].load) {
        ns[viewName[0]].load(viewName[1]);
        console.log(viewName[1]);
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

(function(ns) {
  'use strict';
  ns.profile = {};

  ns.profile.load = function load() {
      $('#profile').empty();
      $('#profile')
        .append( $('<div class="wrapper">')
          .append( $('<ul>')
            .append( $('<li>').text("Username: " + ns.userData.login))
            .append( $('<li>').text("Name: " + ns.userData.name))
            .append( $('<li>').text("Repos: " + ns.userData.public_repos))
            .append( $('<li>').text("Followers: " + ns.userData.followers))
            .append( $('<li>').text("Account created: " + ns.userData.created_at)) //need to convert this date
          )
        );
      $('#profile')
        .append($('<img>',{id:'userAvatar',src: ns.userData.avatar_url})
      );
  };

  window.ght = ns;
})(window.ght || {});

//# sourceMappingURL=main.js.map