angular.module('ProductApp', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) { 
        $routeProvider
            .when('/product', {
                template: 'Welcome'
            })
    })