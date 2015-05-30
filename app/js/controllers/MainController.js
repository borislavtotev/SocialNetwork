'use strict';

SocialNetwork.controller('MainController', function ($scope, $location, authentication, profileServices, postServices, noteServices) {

    $scope.startPage = 1;
    $scope.pageSize = 10;
    $scope.username = authentication.GetUsername();
    $scope.isAdmin = authentication.GetIsAdmin();
    $scope.isNotAdmin = (!$scope.isAdmin || $scope.isAdmin == "false");
    $scope.path = $location.path();
    if ($scope.username) {
        $scope.isLogged = true;
        profileServices.GetMyData(function (serverData) {
            $scope.userData = serverData;
            var path = $location.path();
            if ((path.indexOf("home") == -1) && !authentication.isLoggedIn()) {
                $location.path('/');
            }

            if (path.indexOf('/users/') != -1) { // in the users path
                $scope.currentUserName = path.split('/')[2];
                authentication.GetUserFullData($scope.currentUserName, function(serverData) {
                    $scope.currentUser = serverData;
                    if (path.indexOf('friends') != -1) { //in the friends page
                        if ($scope.currentUserName == $scope.username) { //my friends
                            getMyFriends();
                            $scope.pageTitle = 'My Friends';
                        } else if ($scope.currentUser.isFriend) {  //my friend's friends
                            getUserFriends();
                            $scope.pageTitle = $scope.currentUser.name + '\'s Friends';
                        } else { // can't see friends of someone else who is not my friend
                            $scope.currentUser = {};
                            $scope.currentUserName = '';
                            $location.path('/home');
                        }

                        $scope.isWallPage = false;
                    } else { // in the wall
                        $scope.pageTitle = "User Wall";
                        $scope.isWallPage = true;
                        authentication.GetWallData($scope.currentUserName, $scope.pageSize, function(wallData) {
                            $scope.postsData = wallData;
                        }, function (error) {
                            noteServices.showError(error);
                        });

                        if ($scope.currentUserName == $scope.username) { //my way
                            getMyFriends();
                        } else {
                            getUserFriends();
                        }
                    }
                }, function (error) {
                    noteServices.showError(error);
                });
            } else if (path.indexOf("home") != -1 && authentication.isLoggedIn()) {  // in the home
                $scope.pageTitle = 'News Feed';
                getMyFriends();
                $scope.currentUser = $scope.userData;
                profileServices.GetNewsFeeds($scope.pageSize, function (feedsData) {
                    $scope.postsData = feedsData;
                }, function (error) {
                    noteServices.showError(error);
                });

                $scope.isWallPage = false;
            } else {
                $scope.currentUser = {};
                $scope.currentUserName = '';
                $scope.isWallPage = false;
            }

            if ((path.indexOf("/profile") != -1) && authentication.isLoggedIn()) {
                $scope.pageTitle = 'Edit Profile';
            }

            if ((path.indexOf("profile/password") != -1) && authentication.isLoggedIn()) {
                $scope.pageTitle = 'Change Password';
            }
        }, function (error) {
            noteServices.showError(error);
        })
    }

    var getMyFriends = function() {
        profileServices.GetMyOwnFriends(function (data) {
            $scope.friends = data;
        }, function (error) {
            noteServices.showError(error);
        });
    };

    var getUserFriends = function () {
        authentication.GetUserFriends($scope.currentUserName, function (data) {
            $scope.friends = data;
        }, function (error) {
            noteServices.showError(error);
        });
    };
});