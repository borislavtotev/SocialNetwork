'use strict';

SocialNetwork.factory('postServices', function ($http, baseServiceUrl, authentication) {
    var postServices = {};

    var serviceUrl = baseServiceUrl + '/posts';

    postServices.GetPostById = function (postId, successFunction, errorFunction) {
        $http.get(serviceUrl + '/' + postId, {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data)
            })
            .error(errorFunction);
    };

    postServices.AddNewPost = function (postData, successFunction, errorFunction) {
        $http.post(serviceUrl, postData, {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    postServices.EditPostById = function (postId, postContent, successFunction, errorFunction) {
        $http.put(serviceUrl + '/' + postId, {"postContent" : postContent}, {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data)
            })
            .error(errorFunction);
    };

    postServices.DeletePostById = function (postId, successFunction, errorFunction) {
        $http.delete(serviceUrl + '/' + postId, {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data)
            })
            .error(errorFunction);
    };

    postServices.AddNewComment = function (postId, commentData, successFunction, errorFunction) {
        $http.post(serviceUrl + "/" + postId + "/comments", {"commentContent" : commentData}, {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    postServices.GetAllComments = function (postId, successFunction, errorFunction) {
        $http.get(serviceUrl + '/' + postId + '/comments', {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data)
            })
            .error(errorFunction);
    };

    postServices.LikePost = function (postId, successFunction, errorFunction) {
        $http.post(serviceUrl + "/" + postId + "/likes", {}, {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    postServices.UnlikePost = function (postId, successFunction, errorFunction) {
        $http.delete(serviceUrl + "/" + postId + "/likes", {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    return postServices;
});