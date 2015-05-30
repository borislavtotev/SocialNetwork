'use strict';

SocialNetwork.factory('authentication', function ($http, baseServiceUrl) {
    var service = {};

    var serviceUrl = baseServiceUrl + '/users';

    service.Login = function (loginData, successFunction, errorFunction) {
        $http.post(serviceUrl + '/login', loginData)
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    service.Register = function (registerData, successFunction, errorFunction) {
        $http.post(serviceUrl + '/register', registerData)
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    service.GetUserFullData = function (userName, successFunction, errorFunction) {
        $http.get(serviceUrl + '/' + userName, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data)
            })
            .error(errorFunction);
    };

    service.GetUserPreviewData = function (userName, successFunction, errorFunction) {
        $http.get(serviceUrl + '/' + userName + '/preview', {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data)
            })
            .error(errorFunction);
    };

    service.GetUsersByName = function (searchString, successFunction, errorFunction) {
        $http.get(serviceUrl + '/search?searchTerm=' + searchString, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data)
            })
            .error(errorFunction);
    };

    service.GetWallData = function (userName, pageSize, successFunction, errorFunction) {
        $http.get(serviceUrl + '/' + userName + '/wall?StartPostId=&PageSize=' + pageSize, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data)
            })
            .error(errorFunction);
    };

    service.GetUserFriends = function (username, successFunction, errorFunction) {
        $http.get(serviceUrl + '/' + username + '/friends', {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    service.SetCredentials = function (serverData) {
        localStorage['accessToken'] = serverData['access_token'];
        localStorage['userName'] = serverData['userName'];
        localStorage['isAdmin'] = serverData.isAdmin ? serverData.isAdmin : false;
    };

    service.GetUsername = function () {
        return localStorage['userName'];
    };

    service.GetName = function () {
        return localStorage['name'];
    };

    service.GetIsAdmin = function () {
        return localStorage['isAdmin'];
    };

    service.ClearCredentials = function () {
        localStorage.clear();
    };

    service.GetHeaders = function() {
        return {
            Authorization: "Bearer " + localStorage['accessToken']
        };
    };

    service.isLoggedIn = function () {
        return localStorage['accessToken'];
    };

    return service;
});