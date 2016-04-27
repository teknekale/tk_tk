'use strict';

var config = require('config');

angular
    .module('app.services')
    .factory('LoginService', Factory);

Factory.$inject = [];

function Factory() {
    return {
        'login': function(username, password) {
            return username + ' - ' + password;
        }
    };
}
