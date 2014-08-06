'use strict';

/**
 * @ngdoc function
 * @name soondcloodApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soondcloodApp
 */
scApp.controller('MainCtrl', function ($scope, SoundService) {
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