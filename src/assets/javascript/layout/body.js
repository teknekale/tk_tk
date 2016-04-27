'use strict';

require('layout/body.html');

angular
    .module('app.layout')
    .directive('aplBody', Directive);

Directive.$inject = ["$window"];

function Directive($window) {
    function Link($scope, $element) {
        var $win = angular.element($window);
    }

    function Controller($scope) { }

    return {
        'link': Link,
        'controller': ['$scope', Controller],
        'restrict': 'E',
        'replace': true,
        'templateUrl': 'layout/body.html'
    };
}
