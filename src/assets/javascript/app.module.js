'use strict';

// Loading 3rd party dependencies
var angular = require('angular');

require('angular-resource');
require('angular-sanitize');
require('angular-route');
require('ng-dialog');

// Loading app modules
require('content/content.module');
require('data/translations/en');
require('directives/directives.module');
require('layout/layout.module');
require('services/services.module');

// Dependency injection
angular.module('app', [
    'ngSanitize',
    'ngDialog',
    'ngRoute',

    'app.content',
    'app.directives',
    'app.layout',
    'app.services',
    'app.translations'
])
.config(AppConfig)
.run(AppRun);

// Global AngularJS configuration goes here
AppConfig.$inject = [];

function AppConfig() {}

// Start-up code goes here
AppRun.$inject = ['$rootScope'];

function AppRun($rootScope) {
    $rootScope.isLoggedIn = false;
}
