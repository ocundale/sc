'use strict';

/**
 * @ngdoc function
 * @name soondcloodApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soondcloodApp
 */
scApp.controller('MainCtrl', function ($scope, SoundService, scData) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.getData = function () {
        $scope.newData = scData($scope.scDetails);
        console.log(newData);

    };

    $scope.test = function() {
        console.log(scData);
        return $scope.test = 'isLoggedIn';
    };

    //scDetails:
    // username
    // tracksPerArtist
    // daysOld
    $scope.showTracks = function () {
        SoundService.getTracks($scope.scDetails);

        // $scope.scDetails = {};

    }

});