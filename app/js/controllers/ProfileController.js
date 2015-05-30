'use strict';

SocialNetwork.controller('ProfileController', function ($scope, $location, authentication, profileServices, noteServices, fileReader) {
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
        $scope.userData.profileImageData = profileImageHtml ? profileImageHtml.currentSrc : "";

        var coverImageHtml = document.getElementById('coverImagePreview');
        $scope.userData.coverImageData = coverImageHtml ? coverImageHtml.currentSrc : "";

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
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Sent Friend Request!", serverError)
            });
    }
});