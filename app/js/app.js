'use strict';

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute', 'infinite-scroll']);

SocialNetwork.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

SocialNetwork.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/home'
        })
        .when('/home', {
            templateUrl:'templates/partial/home.html',
            controller:'MainController'
        })
        .when('/users/:username', {
            templateUrl:'templates/user/userWall.html',
            controller:'MainController'
        })
        .when('/users/:username/friends', {
            templateUrl:'templates/partial/allFriends.html',
            controller:'MainController'
        })
        .when('/profile', {
            templateUrl:'templates/partial/editProfile.html',
            controller:'MainController'
        })
        .when('/profile/password', {
            templateUrl:'templates/partial/changePassword.html',
            controller:'MainController'
        })
        .otherwise({redirectTo: '/'});
}]);