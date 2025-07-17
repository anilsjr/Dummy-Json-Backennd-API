import express from 'express';
import {
  allCarts,
  getCartById,
  getCartsByUserId,
  addCart,
  updateCart,
  deleteCart
} from '../controller/carts.controller.js';

const router = express.Router();

// Get all carts
router.get('/', allCarts);
// Get a single cart
router.get('/:id', getCartById);
// Get carts by user
router.get('/user/:id', getCartsByUserId);
// Add a cart
router.post('/add', addCart);
// Update a cart
router.put('/update/:id', updateCart);
// Delete a cart
router.delete('/delete/:id', deleteCart);

export default router;