'use strict';

SocialNetwork.controller('PostController', function ($scope, $location, authentication, postServices, noteServices) {
    $scope.addPost = function () {
        $scope.postData.username = $scope.currentUserName;
        postServices.AddNewPost($scope.postData,
            function() {
                noteServices.showInfo("Successful Posted Message");
                authentication.GetWallData($scope.currentUserName, 5, function(wallData) {
                    $scope.$parent.postsData = wallData;
                    $scope.postData = {};
                    $scope.postData.postContent = '';
                }, function (error) {
                    noteServices.showError(error);
                })
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Posted Message!", serverError)
            });
    };

    $scope.editPost = function (e) {
        $scope.$parent.postEditorEnabled = true;
        $scope.$parent.editablePostContent = e.postContent;
    };

    $scope.saveUpdatedPost = function(e) {
        var id = e.id,
            newPostContent = e.postContent;
        postServices.EditPostById(id, newPostContent,
            function() {
                noteServices.showInfo("Successful Edited Post");
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Edited Post!", serverError)
            });
        $scope.cancelEditPost();
    };

    $scope.cancelEditPost = function(e) {
        $scope.$parent.postEditorEnabled = false;
        $scope.$parent.editablePostContent = {};
    };

    $scope.deletePost = function (e) {
        postServices.DeletePostById(e.id,
            function() {
                noteServices.showInfo("Successful Deleted Post!");
                document.getElementById(e.id).remove();
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Deleted Post!", serverError)
            });
    };
});