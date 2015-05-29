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

    return postServices;
});