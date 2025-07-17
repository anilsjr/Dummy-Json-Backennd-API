import express from 'express';
import { addUser, allUsers, deleteUser, filterUsers, searchUserById, searchUserCarts, searchUserPosts, searchUsersByName, searchUserTodos, updateUser, loginUser, getCurrentUser, refreshSession } from '../controller/users.controller.js';

const router = express.Router();

router.get('/', allUsers);

router.get('/search', searchUsersByName);
// router.get('/filter', filterUsers);
router.get('/:id', searchUserById);
router.post('/:id', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/carts', searchUserCarts);
router.get('/:id/posts', searchUserPosts);
router.get('/:id/todos', searchUserTodos);

// Auth endpoints
router.post('/login', loginUser);
router.get('/me', getCurrentUser);
router.post('/refresh', refreshSession);

export default router;