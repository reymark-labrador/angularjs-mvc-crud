angular.module('ProductApp', [])
    .controller('RegisterController', function ($http, $window) {
 
        var registerControl = this;

        //validate auth token
        if ($window.localStorage.getItem('auth-token') != null) {
            $http({
                method: 'Post',
                url: '/api/auth/validate',
                data: {
                    'token': $window.localStorage.getItem('auth-token')
                }
            }).then(function (res) {
                if (res.data) {
                    $window.location.href = '/';
                }
            });
        }

        registerControl.handleSignup = function () {
            $http({
                method: 'Post',
                url: '/api/auth/register',
                data: {
                    'name': registerControl.Name,
                    'email': registerControl.Email,
                    'password': registerControl.Password
                }
            }).then(function (res) {
                $window.location.href = '/page/login';
            }, function () {
                
            });
        }
    });