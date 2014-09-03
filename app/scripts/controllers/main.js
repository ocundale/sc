'use strict';

/**
 * @ngdoc function
 * @name soondcloodApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the soondcloodApp
 */
scApp.controller('MainCtrl', function ($scope, SoundService, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.checkReady = function() {
      //   var widgetIframe = document.getElementById('i_frame'+id),
      //       widget       = SC.Widget(widgetIframe);
      //   widget.bind(SC.Widget.Events.READY, function() {
      //   console.log('ready!!');
      //   widget.bind(SC.Widget.Events.PLAY, function() {
      //    console.log('playing');
      //   });
      // });
    };

});
