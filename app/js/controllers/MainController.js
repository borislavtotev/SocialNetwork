'use strict';

SocialNetwork.controller('MainController', function ($scope, $location, authentication, profileServices, postServices, noteServices) {

    $scope.startPage = 1;
    $scope.username = authentication.GetUsername();
    $scope.isAdmin = authentication.GetIsAdmin();
    $scope.isNotAdmin = (!$scope.isAdmin || $scope.isAdmin == "false");
    $scope.path = $location.path();
    if ($scope.username) {
        $scope.isLogged = true;
        profileServices.GetMyData(function (serverData) {
            $scope.userData = serverData;
        }, function (error) {
            noteServices.showError(error);
        })
    }

    var path = $location.path();
    if ((path.indexOf("home") == -1) && !authentication.isLoggedIn()) {
        $location.path('/');
    }

    if (path.indexOf('/users/') != -1 && path.indexOf('friends') == -1 ) {
        $scope.currentUserName = path.split('/')[2];
        authentication.GetWallData($scope.currentUserName, 5, function(wallData) {
            $scope.postsData = wallData;
        }, function (error) {
            noteServices.showError(error);
        });

        authentication.GetUserFullData($scope.currentUserName, function(serverData) {
            $scope.currentUser = serverData;
        }, function (error) {
            noteServices.showError(error);
        });
    } else if (path.indexOf("home") != -1) {
        profileServices.GetNewsFeeds(5, function (feedsData) {
            $scope.postsData = feedsData;
        }, function (error) {
            noteServices.showError(error);
        });
    } else {
        $scope.currentUser = {};
        $scope.currentUserName = '';
    }
});