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

    return profileServices;
});