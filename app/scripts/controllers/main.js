'use strict';

/**
 * @ngdoc function
 * @name soondcloodApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soondcloodApp
 */
scApp.controller('MainCtrl', function ($scope, SoundService, $sce) {
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
            console.log(results);
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

});