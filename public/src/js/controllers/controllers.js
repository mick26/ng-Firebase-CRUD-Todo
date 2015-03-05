'use strict';

/*=============================================================================
Module - for the Controllers
============================================================================ */
angular.module('fireApp.controllers').


/**
 * Controller - MainCtrl
 */
controller('MainCtrl', function($scope, $q, TodoService) {
	$scope.formData = {};
	$scope.todos={};
	$scope.newTodo = {"text":"", "done": false};

	/*
	 * Get Todos
	 */
	$scope.todos = TodoService.getTodos();
	/*
	 * Create a New Todo
	 */
	$scope.createTodo = function() {
		$scope.newTodo = {
			"text":angular.copy($scope.formData.text), 
		    "done": false
		};
		TodoService.createTodo($scope.newTodo);
	};

	/*
	 * Update a Todo
	 */
	$scope.editTodo = function(id, txt, isDone) {
		var updateData = {"text":txt, "done": isDone};
		TodoService.updateTodo(id, updateData);
	};


	/*
	 * Delete a Todo
	 */
	$scope.deleteTodo = function(id) {
	    console.log("Delete ID = "+id); //TEST
	    TodoService.deleteTodo(id);
	};
});
