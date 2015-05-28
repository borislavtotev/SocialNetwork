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
                successFunctiondata();
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

    service.GetUsersByName = function (searchString, successFunction, errorFunction) {
        $http.get(serviceUrl + '/search?searchTerm=' + searchString, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data)
            })
            .error(errorFunction);
    };

    service.EditUserProfile = function (editUserData, successFunction, errorFunction) {
        $http.put(serviceUrl + '/profile', editUserData, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data)
            })
            .error(errorFunction);
    };

    service.ChangePassword = function (passwordData, successFunction, errorFunction) {
        $http.put(serviceUrl + '/ChangePassword', passwordData, {headers: this.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction()
            })
            .error(errorFunction);
    };

    function getNameFromProfile (userName, successFunction) {
        $http.get(serviceUrl + '/' + userName, {headers: service.GetHeaders()})
            .success(function (data) {
                successFunction(data['name']);
            });
    };

    service.SetCredentials = function (serverData) {
        localStorage['accessToken'] = serverData['access_token'];
        localStorage['userName'] = serverData['userName'];
        getNameFromProfile(serverData['userName'], function(name) {
            localStorage['name'] = name;
        });
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