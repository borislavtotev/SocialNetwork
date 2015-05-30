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

    if (path.indexOf('/users/') != -1) { // in the users path
        $scope.currentUserName = path.split('/')[2];
        authentication.GetUserFullData($scope.currentUserName, function(serverData) {
            $scope.currentUser = serverData;
            if (path.indexOf('friends') != -1) { //in the friends page
                if ($scope.currentUserName == $scope.username) {
                    profileServices.GetMyOwnFriends(function (data) {
                        $scope.friends = data;
                    }, function (error) {
                        noteServices.showError(error);
                    });
                } else if ($scope.currentUser.isFriend) {
                    authentication.GetUserFriends($scope.currentUserName, function (data) {
                        $scope.friends = data;
                    }, function (error) {
                        noteServices.showError(error);
                    });
                } else {
                    $scope.currentUser = {};
                    $scope.currentUserName = '';
                    $location.path('/home');
                }
            } else { // in the friend wall
                authentication.GetWallData($scope.currentUserName, 5, function(wallData) {
                    $scope.postsData = wallData;
                }, function (error) {
                    noteServices.showError(error);
                });
            }
        }, function (error) {
            noteServices.showError(error);
        });
    } else if (path.indexOf("home") != -1) {  // in the home
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