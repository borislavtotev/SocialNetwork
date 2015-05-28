'use strict';

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute']);

SocialNetwork.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

SocialNetwork.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/home'
        })
        .when('/home', {
            templateUrl:'templates/partial/home.html',
            controller:'AuthenticationController'
        })
        .otherwise({redirectTo: '/'});
}]);