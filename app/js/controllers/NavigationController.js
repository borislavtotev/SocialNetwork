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
                noteServices.showInfo("Successfully Accepted Request!");
                $scope.pendingRequests = $scope.pendingRequests - 1;
            }, function (data) {
                noteServices.showError("Unsuccessfully Accepted Request!");
            });
    };

    $scope.reject = function (event) {
        var target = angular.element(event.target),
            requestDiv = target.parent(),
            requestId = requestDiv[0].getAttribute('id');

        profileServices.RejectFriendRequest(requestId, function(data) {
            noteServices.showInfo("Successfully Rejected Request!");
            $scope.pendingRequests = $scope.pendingRequests - 1;
        }, function (data) {
            noteServices.showError("Unsuccessfully Rejected Request!");
        });
    };
});