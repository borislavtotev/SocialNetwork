'use strict';

SocialNetwork.controller('MainController', function ($scope, $location, $route, authentication, profileServices, postServices, noteServices, infinityLoad) {

    $scope.username = authentication.GetUsername();
    $scope.isAdmin = authentication.GetIsAdmin();
    $scope.isNotAdmin = (!$scope.isAdmin || $scope.isAdmin == "false");
    $scope.path = $location.path();
    $scope.isLogged = authentication.isLoggedIn();

    if ($scope.path != '/home' && !$scope.isLogged) {
        $location.path('/home');
    }

    if ($scope.isLogged) {
        profileServices.GetMyData(function (serverData) {
            $scope.userData = serverData;

            if ($scope.path.indexOf('/users/') != -1) { // in the users path
                $scope.currentUserName = $scope.path.split('/')[2];
                authentication.GetUserFullData($scope.currentUserName, function(serverData) {
                    $scope.currentUser = serverData;
                    if ($scope.path.indexOf('friends') != -1) { //in the friends page
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
                        $scope.getWallData = new infinityLoad('/users/' + $scope.currentUserName + '/wall');

                        if ($scope.currentUserName == $scope.username) { //my way
                            getMyFriends();
                        } else if($scope.currentUser.isFriend) {
                            getUserFriends();
                        }
                    }
                }, function (error) {
                    noteServices.showError(error);
                });
            } else if ($scope.path == '/home') {  // in the home
                $scope.pageTitle = 'News Feed';
                getMyFriends();
                $scope.currentUser = $scope.userData;
                $scope.getWallData = new infinityLoad('/me/feed');
                $scope.isWallPage = false;
            } else {
                $scope.currentUser = {};
                $scope.currentUserName = '';
                $scope.isWallPage = false;
            }

            if ($scope.path.indexOf("/profile") != -1) {
                $scope.pageTitle = 'Edit Profile';
            }

            if ($scope.path.indexOf("profile/password") != -1) {
                $scope.pageTitle = 'Change Password';
            }
        }, function (error) {
            noteServices.showError(error);
        });

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
    }
});