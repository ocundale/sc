'use strict';

/**
 * @ngdoc overview
 * @name soondcloodApp
 * @description
 * # soondcloodApp
 *
 * Main module of the application.
 */

 var scApp = angular.module('soondcloodApp', ['ngAnimate','ngRoute','angular-loading-bar']);

 scApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
   cfpLoadingBarProvider.latencyThreshold = 300;
 }]);

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
          offset = scDetails.offset || '20',
          limit = '200',
          client_id = 'xxx';

      return $http.jsonp('http://api.soundcloud.com/users/' + username + '/followings.json', {
        params: {
          "client_id": client_id,
          "limit": limit,
          "offset": offset,
          "callback": "JSON_CALLBACK"
        }
      });
    };

    return factory;
});

// Get List of followers of USERNAME
scApp.factory('trackData', function($http) {
  var factory = {};

    factory.trackSearch = function(artist, tracksPerArtist) {
        //return the promise directly.
        var limit = tracksPerArtist,
            client_id = 'xxx';

        return $http.jsonp('http://api.soundcloud.com/users/' + artist + '/tracks.json', {
          params: {
            "client_id": client_id,
            "limit": limit,
            "callback": "JSON_CALLBACK"
          }
        });
      };

    return factory;
});

scApp.controller('followerSearch', function($scope, $location, $routeParams, followerData, trackData, $sce) {
  $scope.search = function() {
    $scope.tracks = null;
    followerData.userSearch($scope.scDetails)
    .then(function success(followers){
        var track,
            artist,
            createDate,
            created,
            daysOld = $scope.scDetails.daysOld || 1,
            today = new Date(),
            tracksPerArtist = $scope.scDetails.tracksPerArtist || 2,
            since = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysOld),
            tracks = [];

        followers.data.forEach(function(follower) {
          artist = follower.permalink;
          trackData.trackSearch(artist, tracksPerArtist)
          .success(function success(trackobj) {
            if (trackobj.length) {
              track = trackobj[0];
              createDate = track.created_at;
              created = new Date(createDate);
              if (created > since) {
                track.src = $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + track.id + '&amp;auto_play=false&amp;color=ff5500&amp;inverse=false&amp;show_user=true');
                tracks.push(track);
              } else {
                console.log('Skipped track #',track.id, ' - older than ',daysOld,' days old.');
              }
              $scope.tracks = tracks;
            }
          });
        });
    }, function (response) {
      alert("check yo' username FOO!");
      // error handler
    });
  }

  // $scope.searchTerm = $location.$$path.split("/")[1];
  // if($scope.searchTerm!="") {
  //  $scope.search();
  // }
});

scApp.directive('iframeLoad', ['$parse', function($parse) { // Inject $parse
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            var loadHandler = $parse(attr.iframeLoad); /* Parse value of
                                                       'imgLoad' attribute */
            // element.on('load', function(obj) {
            //   var id = scope.$index + 1,
            //       widgetIframe = document.getElementById('i_frame' + id),
            //       widget = SC.Widget(widgetIframe);
            //       console.log('iframe ready: ',widgetIframe);
            //   widget.bind(SC.Widget.Events.READY, function() {
            //     console.log('ready!!');
            //     widget.bind(SC.Widget.Events.PLAY, function() {
            //      console.log('playing');
            //     });
            //   });
            // });
        }
    };
}]);
  // var linkFn = function(scope, element, attrs) {
  //       alert('asd');
  //       var widgetIframe = document.getElementById('i_frame'+id),
  //           widget       = SC.Widget(widgetIframe);
  //       widget.bind(SC.Widget.Events.READY, function() {
  //       console.log('ready!!');
  //       widget.bind(SC.Widget.Events.PLAY, function() {
  //        console.log('playing');
  //       });
  //     });

  //   //var loadHandler = $parse(attrs.id);
  //                                       /* Parse value of
  //                                        'imgLoad' attribute */
  //   element.on('load', function() {
  //       element.on('load', linkFn);
  //       /* Run the function returned by $parse.
  //       It needs the scope object to operate properly. */
  //   });
  //     // element.find('iframe').bind('load', function (event) {
  //     //   console.log(event.target.contentWindow.document);
  //     // });
  // };
