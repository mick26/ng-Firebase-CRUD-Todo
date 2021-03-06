/* ============================================================================
Unit Testing

Tests related to app.js file
Tests that Angular exists in the App
Tests that the Main App Module exists
Tests other Modules we created and injected in to the Main App module exist 
============================================================================ */
'use strict';

/**
 * Test if Angular Exists
 */
describe("Angular", function () {
    it("should exist", function () {
        expect(window.angular).toBeDefined();
    });
});


/**
 * Test if the Main App Module fireApp Exists
 */
describe("Main App module: fireApp", function () {
    var mainModule;
    beforeEach(function () {
        mainModule = angular.module('fireApp');
    });

    it("should exist", function () {
        expect(mainModule).toBeDefined();
    });
});


/**
 * Test if Controllers Module fireApp.controllers Exists
 */
describe("fireApp.controllers Module", function () {
    
    var controllersModule;
    beforeEach(function () {
        controllersModule = angular.module('fireApp.controllers');
    });

    it("should exist", function () {
        expect(controllersModule).toBeDefined();
    });
});



/**
 * Test if Services Module fireApp.services Exists
 */
describe("fireApp.services Module", function () {
    
    var emailServicesModule;
    beforeEach(function () {
        emailServicesModule = angular.module('fireApp.services');
    });

    it("should exist", function () {
        expect(emailServicesModule).toBeDefined();
    });
});


/**
 * Test if Services Module fireApp.services Exists
 */
describe("'fireApp.URI' Module", function () {
    
    var uriModule;
    beforeEach(function () {
        uriModule = angular.module('fireApp.URI');
    });

    it("should exist", function () {
        expect(uriModule).toBeDefined();
    });
});