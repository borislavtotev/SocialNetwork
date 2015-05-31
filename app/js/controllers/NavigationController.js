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
});