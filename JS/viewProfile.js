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
