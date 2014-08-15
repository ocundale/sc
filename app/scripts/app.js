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


scApp.service('DataService', function($http) {
  return {
    getData:function(user,offset,days,tracks) {
      var results;
      return $http({ method: 'GET', url: 'http://api.soundcloud.com/users/' + 'deepervibrations' + '/tracks.json?client_id=JD7CspfLkMrqYQ9cNVXDLQ&limit='+'3' })
        .success(function(data) {
          data.forEach(function(track) {
          console.log(track.id);
          // results = '<iframe width="50%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + track.id + '"&amp;auto_play=true&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';
          //     results.push({
          //         "title" : entry.title,
          //         "permalink": entry.permalink,
          //         "genre": entry.genre
          //     });
          //     results.push(entry);
            return results;
            });
          // console.log('re1;',results);
          // console.log('re;',results[0]);
          }).
          error(function() {
              results = 'NO TRACKS!';
          });
          return results;
          // return deferred.promise.then(function(data){ //Do stuff with data.
          //   console.log('we-re in', data);
          // });
      }
    }

    // this.scAccountLogin = function(user) {
    //   var deferred = $q.defer();
    //   SC.initialize({
    //       client_id: 'JD7CspfLkMrqYQ9cNVXDLQ',

    redirect_uri: 'http://soundcloud.dev/soundcloud.html'


    //   });

    //   SC.get('/users/' + user, function(data) {
    //      deferred.resolve(data);
    //   });
    //   // return {
    //   //   showTracks: function(scDetails) {
    //   //     return scDetails + 'asd';
    //   //   }
    //   // }
    //   return deferred.promise.then(function(data){ //Do stuff with data.
    //     console.log('we-re in', data);
    //   });
    // };
});

scApp.service('SoundService', function (TrackService) {
  //save method create a new contact if not already exists
  //else update the existing object

  this.displayTracks = function(scDetails) {
    var results = TrackService.getTracks(scDetails);
    return results;
  };
});

scApp.service('TrackService', function (DataService) {
    //save method create a new contact if not already exists
    //else update the existing object

  this.getTracks = function(scDetails) {
    var user = scDetails.username || 'phytone',
        offset = scDetails.offset || '1',
        days = scDetails.daysOld || '1',
        tracks = scDetails.tracksPerArtist || '1';
    if (user == null) {
      alert('no username');
    } else {
      console.log('datatime!');
      for (var i = 4; i >= 0; i--) {
        var offset = i * 200; //Offset to allow up to 800 artists on search
        var results = DataService.getData(user,offset,days,tracks); //scDetails.username, offset,
        return results;
      }
    }
  };
});
scApp.directive('scembed', function () {
   return {
     restrict: 'E',
     replace: true,
     template: '<iframe width="100%" height="20" scrolling="no" frameborder="no"></iframe>'
     // link: function (scope, element, attributes) {

     // }
   };
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
