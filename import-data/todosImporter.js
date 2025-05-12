import axios from 'axios';
import Todos from '../models/todos.js';
import { sequelize } from '../config/dbConfig.js';

async function importTodos() {
  try {
    const response = await axios.get('https://dummyjson.com/todos');
    const todos = response.data.todos || response.data;

    for (const todo of todos) {
      await Todos.create({
        id: todo.id,
        todo: todo.todo,
        completed: todo.completed,
        user_id: todo.userId
      });
    }
    console.log('Todos import complete!');
  } catch (error) {
    console.error('Error importing todos:', error);
  } finally {
    await sequelize.close();
  }
}

importTodos();
