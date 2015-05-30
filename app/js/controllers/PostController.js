'use strict';

SocialNetwork.controller('PostController', function ($scope, $location, authentication, postServices, noteServices) {
    $scope.addPost = function () {
        $scope.postData.username = $scope.currentUserName;
        postServices.AddNewPost($scope.postData,
            function() {
                noteServices.showInfo("Successful Posted Message");
                authentication.GetWallData($scope.currentUserName, 5, function(wallData) {
                    $scope.$parent.$parent.postsData = wallData;
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

    $scope.addComment = function () {
        $scope.$parent.$parent.addCommentEnabled = true;
    };

    $scope.editComment = function (e) {
        $scope.$parent.commentEditorEnabled = true;
        $scope.$parent.editableCommentContent = e.commentContent;
    };

    $scope.saveUpdatedComment = function(postId, comment) {
        var id = comment.id,
            newCommentContent = comment.commentContent;
        postServices.EditCommentById(postId, id, newCommentContent,
            function() {
                noteServices.showInfo("Successful Edited Comment");
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Edited Comment!", serverError)
            });
        $scope.cancelEditComment();
    };

    $scope.cancelEditComment = function(e) {
        console.log('edit comment');
        $scope.$parent.commentEditorEnabled = false;
        $scope.$parent.$parent.commentEditorEnabled = false;
        $scope.$parent.editableCommentContent = {};
    };

    $scope.deleteComment = function (postId, comment) {
        postServices.DeleteCommentById(postId, comment.id,
            function() {
                noteServices.showInfo("Successful Deleted Comment!");
                document.getElementById(postId + '_' + comment.id).remove();
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Deleted Comment!", serverError)
            });
    };

    $scope.cancelNewComment = function () {
        $scope.$parent.$parent.addCommentEnabled = false;
    };

    $scope.saveNewComment = function (e) {
        var id = e.id,
            newCommentContent = $scope.newComment.content;
        postServices.AddNewComment(id, newCommentContent,
            function(newCommentData) {
                noteServices.showInfo("Successful Added Comment!");
                $scope.post.comments.push(newCommentData);
            },
            function (serverError) {
                noteServices.showError("Unsuccessful Added Comment!", serverError)
            });

        $scope.cancelNewComment();
    };

    $scope.showAllComments = function (e) {
        var id = e.id;

        postServices.GetAllComments(id,
            function(allCommentsData) {
                var newCommentsData = allCommentsData.slice(3, allCommentsData.length);
                $scope.post.comments.push.apply($scope.post.comments, newCommentsData);
                document.getElementById(id + 'showMoreCommentsButton').remove();
            },
            function (serverError) {
                noteServices.showError("Unable to get all comments!", serverError)
            });
    };

    $scope.likePost = function (e) {
        var id = e.id;

        postServices.LikePost(id,
            function(likesData) {
                $scope.post.likesCount = likesData.likesCount;
                $scope.$parent.post.liked = true;
            },
            function (serverError) {
                noteServices.showError("Unable to like this post!", serverError)
            });
    };

    $scope.unlikePost = function (e) {
        var id = e.id;

        postServices.UnlikePost(id,
            function(likesData) {
                $scope.post.likesCount = likesData.likesCount;
                $scope.$parent.post.liked = false;
            },
            function (serverError) {
                noteServices.showError("Unable to like this post!", serverError)
            });
    };

    $scope.likeComment = function (postId, comment) {
        postServices.LikeComment(postId, comment.id,
            function(likesData) {
                $scope.comment.likesCount = likesData.likesCount;
                $scope.$parent.comment.liked = true;
            },
            function (serverError) {
                noteServices.showError("Unable to like this comment!", serverError)
            });
    };

    $scope.unlikeComment = function (postId, comment) {
        postServices.UnlikeComment(postId, comment.id,
            function(likesData) {
                $scope.comment.likesCount = likesData.likesCount;
                $scope.$parent.comment.liked = false;
            },
            function (serverError) {
                noteServices.showError("Unable to unlike this comment!", serverError)
            });
    };
});