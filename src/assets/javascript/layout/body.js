'use strict';

require('layout/body.html');

angular
    .module('app.layout')
    .directive('tkBody', Directive);

Directive.$inject = ['$window', 'LoginService'];

function Directive($window, LoginService) {
    function Link($scope, $element) {
        $scope.login = login;

        function login() {
            var auth = null;
            $scope.auth = 'stocazzo!';

            auth = LoginService.login($scope.username, $scope.password);

            if(auth) {
                $scope.auth = auth;
            }
        }
    }

    return {
        'link': Link,
        'restrict': 'E',
        'replace': true,
        'templateUrl': 'layout/body.html'
    };
}
