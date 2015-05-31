'use strict';

SocialNetwork.controller('ProfileController', function ($scope, $location, authentication, profileServices, noteServices, fileReader) {
    $scope.hasPendingRequestFromUser = function () {
        if ($scope.requestsfromUsers) {
            for (var i = 0; i < $scope.requestsfromUsers.length; i++) {
                var obj = $scope.requestsfromUsers[i];
                if (obj == $scope.currentUserName) {
                    return true;
                }
            }
        };

        return false;
    };

    profileServices.GetFriendsRequests(function(data) {
        $scope.requests = data;
        $scope.pendingRequests = data.length;
        $scope.requestsfromUsers = [];

        for (var i = 0; i < data.length; i++) {
            var request = data[i];
            $scope.requestsfromUsers.push(request.user.username);
        }

    }, function () {
        noteServices.showError("Unable to get friends request!");
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

    $scope.startNewRow = function (index, count) {
        return ((index) % count) === 0;
    };

    $scope.changePassword = function () {
        profileServices.ChangePassword($scope.changePasswordData,
            function() {
                noteServices.showInfo("Successful Password Change!");
                $location.path('/home');
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Password Change!", serverError)
            });
    };

    $scope.changeMyProfile = function () {
        var profileImageHtml = document.getElementById('profileImagePreview');
        if (profileImageHtml && profileImageHtml.currentSrc) {
            $scope.userData.profileImageData = profileImageHtml.currentSrc;
        }

        var coverImageHtml = document.getElementById('coverImagePreview');
        if (coverImageHtml && coverImageHtml.currentSrc) {
            $scope.userData.coverImageData = coverImageHtml.currentSrc;
        }

        profileServices.EditMyProfile($scope.userData,
            function(serverData) {
                noteServices.showInfo("Successful Edited Profile!");
                $location.path('/home');
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Edited Profile!", serverError)
            });
    };

    $scope.sendFriendRequest = function(username) {
        profileServices.sendFriendRequest(username,
            function(serverData) {
                noteServices.showInfo("Successful Sent Friend Request!");
                $scope.$parent.currentUser.hasPendingRequest = true;
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Sent Friend Request!", serverError)
            });
    }
});