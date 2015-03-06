'use strict';
/* ============================================================================
Module - Main App Module
============================================================================ */
angular.module('fireApp', ['fireApp.controllers', 'fireApp.services']);


//angular.module('fireApp.Routes', ['ngRoute']);
angular.module('fireApp.URI', []);
angular.module('fireApp.services', ['firebase', 'fireApp.URI']);
angular.module('fireApp.controllers', []);

