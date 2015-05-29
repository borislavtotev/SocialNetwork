'use strict';

SocialNetwork.controller('PostController', function ($scope, $location, authentication, postServices, noteServices) {
    $scope.addPost = function () {
        console.log("post");
        $scope.postData.username = $scope.currentUserName;
        postServices.AddNewPost($scope.postData,
            function() {
                noteServices.showInfo("Successful Posted Message");
                authentication.GetWallData($scope.currentUserName, 5, function(wallData) {
                    $scope.postsData = wallData;
                    $location.reload();
                    console.log('new posted');
                }, function (error) {
                    noteServices.showError(error);
                })
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Posted Message!", serverError)
            });
    }
});