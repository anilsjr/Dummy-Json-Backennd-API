import Todos from '../models/todos.model.js'
import { sequelize } from "../config/dbConfig.js";
import { Op, Sequelize } from 'sequelize';
import { isInteger } from '../utility/utils.js';

export const allTodos = async (req, res) => {
     try {
        let {
            limit,
            skip,
            sortBy,
            order,
            search
        } = req.query;

        limit = parseInt(limit);
        skip = parseInt(skip);

        limit = isNaN(limit) || limit <= 0 ? 20 : limit;
        skip = isNaN(skip) || skip <= 0 ? 0 : skip;
        
        const offset = skip;
        const fields = search;

        const validSortFields = ['id', 'todo', 'user_id'];
        sortBy = validSortFields.includes(sortBy) ? sortBy : 'id';
        order = ['ASC', 'DESC'].includes(order?.toUpperCase()) ? order.toUpperCase() : 'ASC';
        const attributes = fields ? fields.split(',') : undefined;

        // Get total count for pagination
        const total = await Todos.count();
        const todos = await Todos.findAll({
            attributes,
            limit,
            offset,
            order: [[sortBy, order]],
        });
        res.status(200).json({ todos, total, skip: offset, limit });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Error fetching todos', error: error.message });
    }
}

export const searchTodoById = async (req, res) => {
    let { id } = req.params;
    try {
        id = parseInt(id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'todo id must be an integer', input: `You provided: ${id}` });
        }
        const todo = await Todos.findByPk(id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ message: `todo with id '${id}' NOT found` });
        }
    } catch (error) {
        console.error('Error fetching todo by id:', error);
        res.status(500).json({ message: 'Error fetching todo', error: error.message });
    }
};

export const searchTodoRandomly = async (req, res) => {
    try {
        const todo = await Todos.findOne({
            order: sequelize.random()
        });
        if (todo) {
            res.status(200).json({ todo });
        } else {
            res.status(404).json({ message: 'No todo found' });
        }
    } catch (error) {
        console.error('Error fetching random todo:', error);
        res.status(500).json({ message: 'Error fetching random todo', error: error.message });
    }
};


export const searchTodosByUserId = async (req, res) => {
    let { id } = req.params;
    try {
        id = parseInt(id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'user-id must be an integer', input: `You provided: ${id}` });
        }
        const todo = await Todos.findByPk();
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ message: `todo with user-id : '${id}' NOT found` });
        }
    } catch (error) {
        console.error('Error fetching todo by id:', error);
        res.status(500).json({ message: 'Error fetching todo', error: error.message });
    }
};

// Dummy logic for POST, PUT, DELETE
export const addTodo = (req, res) => {
    res.status(201).json({ message: 'Todo added (dummy logic)' });
};

export const updateTodo = (req, res) => {
    res.status(200).json({ message: `Todo ${req.params.id} updated (dummy logic)` });
};

export const deleteTodo = (req, res) => {
    res.status(200).json({ message: `Todo ${req.params.id} deleted (dummy logic)` });
};

