import { Sequelize } from 'sequelize';
import Users from '../models/users.model.js';
import Carts from '../models/carts.model.js';
import Posts from '../models/posts.model.js';
import Todos from '../models/todos.model.js';

const Op = Sequelize.Op;

// Get all users
export const allUsers = async (req, res) => {
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
    const users = await Users.findAll({
            attributes,
            limit,
            offset,
            order: [[sortBy, order]]
        });

    res.status(200).json({ users, total:users.length, limit, skip });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
}

// Get user by ID
export const searchUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Search users by name
export const searchUsersByName = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ message: 'Query parameter "name" is required' });
  }
  try {
    const users = await Users.findAll({
      where: {
        [Op.or]: [
            { first_name: { [Op.like]: `%${name}%` } },
            { last_name: { [Op.like]: `%${name}%` } }
        ]  
      }
    });
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error searching users', error: err.message });
  }
};

// Filter users (dummy, returns all)
export const filterUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error filtering users', error: err.message });
  }
};

// Add user
export const addUser = async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json({ message: 'User added', user });
  } catch (err) {
    res.status(500).json({ message: 'Error adding user', error: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const [updated] = await Users.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    const user = await Users.findByPk(req.params.id);
    res.status(200).json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await Users.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

// Get user's carts
export const searchUserCarts = async (req, res) => {
  try {
    const carts = await Carts.findAll({ where: { user_id: req.params.id } });
    res.status(200).json({ carts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching carts', error: err.message });
  }
};

// Get user's posts
export const searchUserPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll({ where: { user_id: req.params.id } });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};

// Get user's todos
export const searchUserTodos = async (req, res) => {
  try {
    const todos = await Todos.findAll({ where: { user_id: req.params.id } });
    res.status(200).json({ todos });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos', error: err.message });
  }
};

// Dummy login and get current user endpoints
export const loginUser = (req, res) => {
    res.status(200).json({ message: 'Login successful (dummy logic)', token: 'dummy-token' });
};

export const getCurrentUser = (req, res) => {
    res.status(200).json({ id: 1, name: 'Dummy User', email: 'dummy@example.com' });
};

export const refreshSession = (req, res) => {
    res.status(200).json({ message: 'Session refreshed (dummy logic)', token: 'dummy-refreshed-token' });
};
