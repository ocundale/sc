'use strict';

/**
 * @ngdoc function
 * @name soondcloodApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soondcloodApp
 */
scApp.controller('MainCtrl', function ($scope, SoundService, $sce, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // $scope.getData = function () {
    //     $scope.newData = DataService($scope.scDetails);
    //     console.log(newData);

    // };
    $scope.findTracks = function() {
        SoundService.displayTracks($scope.scDetails)
        .then(function success(results){
            results.data.forEach(function(result) {
                result.src = $sce.trustAsResourceUrl('https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + result.id + '&amp;auto_play=false&amp;color=ff5500&amp;inverse=false&amp;show_user=true');
            });

            $scope.results = results;
        });
    }

    //scDetails:
    // username
    // tracksPerArtist
    // daysOld
    $scope.showTracks = function () {
        SoundService.getTracks($scope.scDetails);
        // $scope.scDetails = {};
    }


    $scope.onLoad = function() {
     console.log('asdd');
        // $timeout(alert('Image Loaded'));
    }

    $scope.checkReady = function(){
        var widgetIframe = document.getElementById('i_frame'+id),
            widget       = SC.Widget(widgetIframe);
        widget.bind(SC.Widget.Events.READY, function() {
        console.log('ready!!');
        widget.bind(SC.Widget.Events.PLAY, function() {
         console.log('playing');
        });
      });
    }

});
