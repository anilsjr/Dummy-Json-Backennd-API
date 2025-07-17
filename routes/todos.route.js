import express from "express";

import {allTodos, searchTodoRandomly, searchTodoById, searchTodosByUserId, addTodo, updateTodo, deleteTodo} from '../controller/todos.controller.js'

const router = express.Router();

router.get('/', allTodos);
router.get('/random', searchTodoRandomly);
router.get('/user/:id', searchTodosByUserId);
router.get('/:id', searchTodoById);
router.post('/', addTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

//add update delete todos --> make them wrong fake donot change the update the database tables


export default router;