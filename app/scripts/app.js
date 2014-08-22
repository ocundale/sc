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
      controller: 'followerSearch'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  });

// Get List of followers of USERNAME
scApp.factory('followerData', function($http) {
  var factory = {};

  factory.userSearch = function(scDetails) {
      //return the promise directly.
      var username = scDetails.username || 'deepervibrations',
          offset = scDetails.offset || '1',
          limit = scDetails.tracksPerArtist || '10',
          days = scDetails.daysOld ||3,
          client_id = 'XXXX';

      return $http.jsonp('http://api.soundcloud.com/users/' + username + '/followings.json', {
        params: {
          "client_id": client_id,
          "limit":limit,
          "callback": "JSON_CALLBACK",
          "offset": offset
        }
      });
    };

    factory.trackSearch = function(followerUsername) {
        //return the promise directly.
        var limit = '1',
        client_id = 'XXXX';
        return $http.jsonp('http://api.soundcloud.com/users/' + followerUsername + '/tracks.json', {
          params: {
            "client_id": client_id,
            "callback": "JSON_CALLBACK",
            "limit":limit
          }
        });
      };

    return factory;
});


 scApp.controller('followerSearch', function($scope, $location, $routeParams, followerData, $sce) {
  $scope.search = function() {
    $scope.data = null;
    $scope.loading = true;
    followerData.userSearch($scope.scDetails)
    .then(function success(followers){
        var track,
            tracks = [];
        followers.data.forEach(function(follower) {
          console.log('loading data for: ',follower.permalink);
          followerData.trackSearch(follower.permalink)
          .success(function success(trackobj) {
            track = trackobj[0];
              track.src = $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + track.id + '&amp;auto_play=false&amp;color=ff5500&amp;inverse=false&amp;show_user=true');
              tracks.push(track);
              $scope.loading = false;
              $scope.tracks = tracks;
          });
        });
    }, function (response) {
      alert("check yo' username FOO!");
      // error handler
    });
  }
// https://github.com/chieffancypants/angular-loading-bar


  // $scope.searchTerm = $location.$$path.split("/")[1];
  // if($scope.searchTerm!="") {
  //  $scope.search();
  // }
});
var hideLoading = function() {
  document.getElementById('divLoading').style.display = "none";
             document.getElementById('divFrameHolder').style.display = "block";
};

scApp.directive('scembed', function () {
  return {
    restrict: 'E',
    replace: true,
    template: '<iframe width="100%" id="divLoading" height="20" scrolling="no" frameborder="no" onload="hideLoading()"></iframe>'
    // link: function (scope, element, attributes) {

    // }
  };
});