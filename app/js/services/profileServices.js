'use strict';

SocialNetwork.factory('profileServices', function ($http, baseServiceUrl, authentication) {
    var profileServices = {};

    var serviceUrl = baseServiceUrl + '/me';

    profileServices.GetFriendsRequests = function (successFunction, errorFunction) {
        $http.get(serviceUrl + '/requests', {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    profileServices.ApproveFriendRequest = function (requestId, successFunction, errorFunction) {
        $http.put(serviceUrl + '/requests/' + requestId + '?status=approved', {}, {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    profileServices.RejectFriendRequest = function (requestId, successFunction, errorFunction) {
        $http.put(serviceUrl + '/requests/' + requestId + '?status=rejected', {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    profileServices.GetMyOwnFriends = function (successFunction, errorFunction) {
        $http.get(serviceUrl + '/friends/', {headers: authentication.GetHeaders()})
            .success(function (data, status, headers, config) {
                successFunction(data);
            })
            .error(errorFunction);
    };

    return profileServices;
});