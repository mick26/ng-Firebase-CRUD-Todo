/*=============================================================================
Unit Test the controller
Ref.
http://fdietz.github.io/recipes-with-angular-js/controllers/testing-controllers.html
http://stackoverflow.com/questions/15487510/angularjs-jasmine-comparing-objects
https://github.com/angular/angular-seed
============================================================================ */
'use strict';

describe('Testing the Controller', function() {

    //Get the Module containing the controller
    beforeEach(function() {
        module('fireApp.controllers');
    });
    
    describe('MainCtrl Controller', function() {
        //Variables
        var mainCtrl;
        var scope;
        var todoService;

        beforeEach(function() {

            inject(function($controller, $rootScope) {
                 //We can’t just initialize the scope as a Javascript object {} 
                 //since we would then not be able to call $watch on it. 
                 //Instead use $rootScope.$new()
                 scope = $rootScope.$new();
                 
                 todoService = {
                    getTodos: function() {
                        //var todos =[];
                        scope.todos = [{"text":"mockTodo1", "done": true}];
                        return scope.todos;
                    },
                    createTodo: function(newTodo) {
                        scope.todos.push(newTodo); //add newTodo to Todos[]
                    },
                    updateTodo: function(id, updateData) {
                        scope.todos[id].text = updateData.text;
                        scope.todos[id].done = updateData.done;
                    },
                    deleteTodo: function(id) {
                        scope.todos.splice(id, 1); 
                    }
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


        /*
         * Test createTodo()
         */
        it('should createTodo', function() {
            //used by controller to make new Todo
            //controller adds "done": false to every new todo
            scope.formData.text ="mockTodoText";
            //for comparing 
            var mockTodo = {
                "text": scope.formData.text,
                "done": false
            };
            /*
             * creates a new Todo i.e. calls TodoService.createTodo(newTodo)
             * which adds Todo to todos[]
             */
            scope.createTodo();
            //test that new todo object has been added to todos[]
            //i.e todos will now have 2 objects
            expect(angular.equals(scope.todos[1], mockTodo)).toBe(true)
        });


        /*
         * Test editTodo()
         */
        it('should editTodo', function() {
            //used by controller to make new Todo
            //controller adds "done": false to every new todo
            //scope.formData.text ="mockTodoText";
            //for comparing 

            var editedTodo = {
                "text": "NewText",
                "done": true
            };
            /*
             * creates a new Todo i.e. calls TodoService.createTodo(newTodo)
             * which adds Todo to todos[]
             */
            scope.editTodo(0, editedTodo.text, editedTodo.done);
            //test that new todo object at scope.todos[0] is 
            //now changed to the new values
            expect(angular.equals(scope.todos[0], editedTodo)).toBe(true)
        });


        /*
         * Test deleteTodo()
         */
        it('should deleteTodo', function() {
            /*
             * deletes Todo at array index 0 i.e. scope.todos[0]
             */
            scope.deleteTodo(0);
            //test that todo object @ spope.todos[0] has been deleted
            expect(angular.equals(scope.todos[0], undefined)).toBe(true)
        });


    });
});