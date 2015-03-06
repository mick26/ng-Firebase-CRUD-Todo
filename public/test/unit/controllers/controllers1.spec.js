/*=============================================================================
Unit Test the controller

============================================================================ */
'use strict';

describe('Testing the Controller', function() {

    //Get the Module containing the controller
    beforeEach(function() {
        //module('mock.firebase'); //not used
        module('fireApp.controllers');
    });

    
    describe('MainCtrl Controller', function() {
        //Variables
        var mainCtrl;
        var scope;
        var todoService;

        beforeEach(function() {
            //module(function($provide) {
            //$provide.value('todos', {text: 'todo1', done:false});
            //});
            inject(function($controller) {
                scope = {};
                todoService = {
                    getTodos: function() {
                        var todos =[];
                        return todos;
                    },
                    createTodo: function(newTodo) {},
                    updateTodo: function() {}
                };

                mainCtrl = $controller('MainCtrl', {
                    $scope: scope,
                    TodoService: todoService
                });
            });
        });

        /**
         * Test that our functions exist
         */
        //$scope.todos are got by calling todoService.getTodos()
        it('should create Todos in scope', function() {
            expect(scope.todos).toBeDefined();
        });

        it('should define createTodo function', function() {
            expect(scope.createTodo).toBeDefined();
        });
        it('should define editTodo function', function() {
            expect(scope.editTodo).toBeDefined();
        });
        it('should define deleteTodo function', function() {
            expect(scope.deleteTodo).toBeDefined();
        });

    });
});