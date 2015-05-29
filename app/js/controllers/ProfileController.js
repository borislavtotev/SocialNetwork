'use strict';

SocialNetwork.controller('ProfileController', function ($scope, $location, authentication, profileServices, noteServices) {
    profileServices.GetMyOwnFriends(function (data) {
        $scope.friends = data;
    });

    $scope.columnBreak = 3;//max number of cols

    $scope.startNewRow = function (index, count) {
        return ((index) % count) === 0;
    };
});