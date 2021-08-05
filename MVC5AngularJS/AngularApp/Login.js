angular.module('ProductApp', [])
    .controller('LoginController', function ($http, $window) {
 
        var loginControl = this;

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

        loginControl.handleLogin = function () {
            $http({
                method: 'Post',
                url: '/api/auth/login',
                data: {
                    'email': loginControl.Email,
                    'password': loginControl.Password
                }
            }).then(function (res) {
                $window.localStorage.setItem('auth-token', res.data);
                $window.location.href = '/';
            }, function () {
                $('#loginModal').modal('show');
            });
        }
    });