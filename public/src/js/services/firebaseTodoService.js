'use strict';

/*=============================================================================
Module - for the Services
============================================================================ */
angular.module('fireApp.services').

/**
 * Create Todo - Factory Service
 */
factory('TodoService', function($firebaseArray, FIREBASE_URI) {
    var fireRef = new Firebase(FIREBASE_URI);
    var todos = $firebaseArray(fireRef);

    //old method - now deprecated
    //var todos = $firebase(fireRef).$asArray();
    //var todos = $firebase(fireRef).$asArray();

    var getTodos = function() {
        return todos;
    };

    var createTodo = function(newTodo) {
        todos.$add(newTodo);
    };

    var updateTodo = function(id) {
        todos.$save(id);
    };

    var deleteTodo = function (id) {
        todos.$remove(id);
    };


    //Return Factory Object
    return {
        getTodos: getTodos,
        createTodo: createTodo,
        updateTodo: updateTodo,
        deleteTodo: deleteTodo
    }
});
