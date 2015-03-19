'use strict';

/*=============================================================================
Module - for the Controllers
============================================================================ */
angular.module('fireApp.controllers').


/**
 * Controller - MainCtrl
 */
controller('MainCtrl', function($q, TodoService) {
	
	var main = this;

	main.formData = {};
	main.todos = {};
	main.newTodo = {"text":"", "done": false};

	/*
	 * Get Todos
	 */
	main.todos = TodoService.getTodos();
	/*
	 * Create a New Todo
	 */
	main.createTodo = function() {
		main.newTodo = {
			"text":angular.copy(main.formData.text), 
		    "done": false
		};
		TodoService.createTodo(main.newTodo);
	};

	/*
	 * Update a Todo
	 */
	main.editTodo = function(id, txt, isDone) {
		var updateData = {"text":txt, "done": isDone};
		TodoService.updateTodo(id, updateData);
	};


	/*
	 * Delete a Todo
	 */
	main.deleteTodo = function(id) {
	    console.log("Delete ID = "+id); //TEST
	    TodoService.deleteTodo(id);
	};
});
