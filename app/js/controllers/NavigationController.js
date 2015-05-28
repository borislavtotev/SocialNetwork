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

    profileServices.GetFriendsRequests(function(data) {
        $scope.pendingRequests = data.length;
        console.log(data.length);
    });
});