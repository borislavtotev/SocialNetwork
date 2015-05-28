'use strict';

SocialNetwork.controller('NavigationController', function ($scope, $location, authentication, noteServices) {
    $scope.search = function () {
        var searchString = $scope.searchString;

        authentication.GetUsersByName(searchString, function (data) {
            $scope.results = data;
            console.log(data);
        });
    };
});