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

    $scope.getData = function () {
    // $http({
    //     url: "http://example.appspot.com/rest/app",
    //     method: "POST",
    //     data: {"foo":"bar"}
    // }).success(function(data, status, headers, config) {
    //     $scope.data = data;
    // }).error(function(data, status, headers, config) {
    //     $scope.status = status;
    // });
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