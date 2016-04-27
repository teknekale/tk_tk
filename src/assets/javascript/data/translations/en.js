'use strict'

require('angular-translate');

angular
    .module('app.translations', ['pascalprecht.translate'])
    .config(Config);

Config.$inject = ['$translateProvider'];

function Config($translateProvider) {
    $translateProvider.translations('en', {

        'HELLO'    : 'Hello World.'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
}