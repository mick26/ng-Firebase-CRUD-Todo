/* ============================================================================
Ref.
https://docs.angularjs.org/guide/unit-testing
http://bahmutov.calepin.co/testing-angularjs-under-node.html
============================================================================ */
'use strict';

/**
 * Test if Services defined in fireApp.services module Exist
 */
describe("Unit: Test fireApp.URI Module", function () {

	/**
	 * Load the module containing
	 */
	beforeEach(module('fireApp.URI'));
    // OR This Also Works:
    // beforeEach(function () {
    // 	angular.mock.module('fireApp.URI', function () {
    //     });
    // });


	/*
	Testing by injecting values
	Test individual entities inside an Angular module
	by loading them into the unit test using injector service. 
	Check if 'fireApp.URI' module: 
	*/
    //Test that module has 'FIREBASE_URI'
    it('has a value called FIREBASE_URI ', function () {
        var injector = angular.injector(['fireApp.URI']);
        expect(injector.has('FIREBASE_URI')).toBe(true);
    });

    //Test the value
    it('FIREBASE_URI has the correct value', function () {
        var injector = angular.injector(['fireApp.URI']);
        expect(injector.get('FIREBASE_URI')).toEqual('https://dpmkxhfbtvg.firebaseio-demo.com/');
    });

});

