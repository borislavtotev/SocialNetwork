'use strict';

SocialNetwork.controller('MainController', function ($scope, $location, authentication, noteServices) {

    $scope.startPage = 1;
    $scope.username = authentication.GetUsername();
    $scope.isAdmin = authentication.GetIsAdmin();
    $scope.isNotAdmin = (!$scope.isAdmin || $scope.isAdmin == "false");
    if ($scope.username) {
        authentication.GetUserFullData($scope.username, function (serverData) {
            $scope.userData = serverData;
            console.log($scope.userData);
        })
    }
    var path = $location.path();
    if ((path.indexOf("user") != -1) && !authentication.isLoggedIn()) {
        $location.path('/');
    }
});