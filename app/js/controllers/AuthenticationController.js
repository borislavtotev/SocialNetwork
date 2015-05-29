'use strict';

SocialNetwork.controller('AuthenticationController', function ($scope, $location, $route, $window,
                                                                authentication, noteServices) {

    $scope.clearData = function () {
        $scope.loginData = "";
        $scope.registerData = "";
        $scope.userData = "";
        $scope.passwordData = "";
    };

    $scope.login = function () {
        authentication.Login($scope.loginData,
            function (serverData) {
                noteServices.showInfo("Successful Login!");
                authentication.SetCredentials(serverData);
                $scope.clearData();
                $location.path('/home');
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Login!", serverError)
            });
    };

    $scope.register = function () {
        authentication.Register($scope.registerData,
            function(serverData) {
                noteServices.showInfo("Successful Register!");
                authentication.SetCredentials(serverData);
                $scope.clearData();
                $location.path('/home');
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Register!", serverError)
            });
    };

    $scope.logout = function () {
        noteServices.showInfo("Successful Logout!");
        $scope.clearData();
        authentication.ClearCredentials();
        $location.path('/');
    };
    //
    //$scope.clear = function () {
    //    mainData.clearParams();
    //    adminServices.clearParams();
    //    $route.reload();
    //};
    //
    //$scope.clearStatus = function () {
    //    adServices.clearParams();
    //    $route.reload();
    //}
});