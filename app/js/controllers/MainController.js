'use strict';

SocialNetwork.controller('MainController', function ($scope, $location, authentication, profileServices, noteServices) {

    $scope.startPage = 1;
    $scope.username = authentication.GetUsername();
    $scope.isAdmin = authentication.GetIsAdmin();
    $scope.isNotAdmin = (!$scope.isAdmin || $scope.isAdmin == "false");
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
});