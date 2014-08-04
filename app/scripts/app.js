'use strict';

/**
 * @ngdoc overview
 * @name soondcloodApp
 * @description
 * # soondcloodApp
 *
 * Main module of the application.
 */

var scApp = angular.module('soondcloodApp', ['ngAnimate','ngRoute']);

scApp.config(function ($routeProvider) {
  $routeProvider
    // Default route: main page
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

scApp.service('SoundService', function () {

    //save method create a new contact if not already exists
    //else update the existing object
    this.getTracks = function (scDetails) {
        if (scDetails.username == null) {
        } else {
          for (var i = 4; i >= 0; i--) {
            var offset = i * 200; //Offset to allow up to 800 artists on search
            getLatestTracks(scDetails.username, offset, scDetails.daysOld, scDetails.tracksPerArtist);
          };

        }
        return scDetails;
    },

    this.getLatestTracks = function(user,offset,daysOld,tracksPerArtist) {
      console.log(user,offset,daysOld,tracksPerArtist);
    }
});

scApp.factory('scData', function($q) {
    var deferred = $q.defer();
    SC.initialize({
        client_id: 'JD7CspfLkMrqYQ9cNVXDLQ',
        redirect_uri: 'http://soundcloud.dev/soundcloud.html'
    });

    SC.get('/users/phytone', function(data) {
       deferred.resolve(data);
    });
    // return {
    //   showTracks: function(scDetails) {
    //     return scDetails + 'asd';
    //   }
    // }
    return deferred.promise.then(function(data){ //Do stuff with data.
      console.log(data);
    });
});

// function getLatestTracks(username,offset,daysOld, tracksPerArtist){
//         $.ajax({
//           type: "GET",
//           url: "http://api.soundcloud.com/users/" + username + "/followings.json?client_id=JD7CspfLkMrqYQ9cNVXDLQ&limit=200&offset=" + offset,
//           success: function(data){
//             for(j in data){
//               user = data[j]['permalink'];
//               $.ajax({
//                 type: "GET",
//                 url: "http://api.soundcloud.com/users/" + user +" /tracks.json?client_id=JD7CspfLkMrqYQ9cNVXDLQ&limit=" + tracksPerArtist,
//                 success: function(data2){
//                   if(jQuery.isEmptyObject(data2)===false){
//                     for(k in data2){
//                       permalink_url = data2[k]['permalink_url'];
//                       created_at = data2[k]['created_at'];
//                       track_id = data2[k]['id'];

//                       var created = new Date(created_at);

//                       var today = new Date();
//                       var since = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysOld);



//                       if(created > since){
//                         //$('#results').append('<p><a href="' + permalink_url + '" target="_BLANK">' + permalink_url + '</a> - Created: ' + created_at + '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + track_id + '"&amp;color=00aabb&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe></p>');
//                         //$('#results').append('<p><iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + track_id + '"&amp;color=00aabb&amp;auto_play=true&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe></p>');
//                         $('#results').append('<iframe width="50%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + track_id + '"&amp;auto_play=true&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>');
//                       }
//                     }
//                   }
//                 }
//               });
//             }
//           }
//         });
//       }

//       $(document).ready(function(){
//         $('#complete').click(function() {
//           $('#results').html("");
//           for (var i = 4; i >= 0; i--) {
//             getLatestTracks($('#txt_username').val(),i * 200,$('#daysOld').val(), $('#tracksPerArtist').val());
//           };
//         });
//       });
