'use strict';

SocialNetwork.controller('NavigationController', function ($scope, $location, authentication, profileServices, noteServices) {
    $scope.search = function () {
        var searchString = $scope.searchString;

        if (searchString) {
            authentication.GetUsersByName(searchString, function (data) {
                $scope.results = data;
            });
        }
    };

    profileServices.GetFriendsRequests(function(data) {
        $scope.requests = data;
        $scope.pendingRequests = data.length;
    });

    $scope.accept = function (event) {
        var target = angular.element(event.target),
            requestDiv = target.parent(),
            requestId = requestDiv[0].getAttribute('id');

            profileServices.ApproveFriendRequest(requestId, function(data) {
                console.log(data);
            })
    };

    $scope.reject = function (event) {
        var target = angular.element(event.target),
            requestDiv = target.parent(),
            requestId = requestDiv[0].getAttribute('id');

        profileServices.RejectFriendRequest(requestId, function(data) {
            console.log(data);
        });
    };
});