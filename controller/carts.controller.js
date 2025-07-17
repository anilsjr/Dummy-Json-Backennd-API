import Carts from '../models/carts.model.js';
import Users from '../models/users.model.js';



//Get all carts
export const allCarts = async (req ,res) => {
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
    const carts = await Carts.findAll({
            attributes,
            limit,
            offset,
            order: [[sortBy, order]]
        });

    res.status(200).json({ carts, total: carts.length, limit, skip });
  } catch (err) {
        res.status(500).json({ message: 'Error fetching cart', error: err.message });
    }
};
// Get a single cart by cart id
export const getCartById = async (req, res) => {
  try {
    const cart = await Carts.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart', error: err.message });
  }
};

// Get carts by user id
export const getCartsByUserId = async (req, res) => {
  try {
    const user = await Carts.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const carts = await Carts.findAll({ where: { user_id: req.params.id } });
    res.status(200).json({ carts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching carts', error: err.message });
  }
};

// Add a cart
export const addCart = async (req, res) => {
  try {
    const { userId, products, total, discounted_total, total_products, total_quantity } = req.body;
    if ( !Array.isArray(products)) {
      return res.status(400).json({ message: 'userId and products array are required' });
    }
    const cart = { userId, products, total, discounted_total, total_products, total_quantity };
    res.status(201).json({ message: 'Cart added', cart });
  } catch (err) {
    res.status(500).json({ message: 'Error adding cart', error: err.message });
  }
};

// Update a cart
export const updateCart = async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await Carts.findByPk(cartId);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    // Only allow updating certain fields
    const allowedFields = ['products', 'total', 'discounted_total', 'total_products', 'total_quantity'];
    const updateData = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) updateData[key] = req.body[key];
    }
    await cart.update(updateData);
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart', error: err.message });
  }
};

// Delete a cart
export const deleteCart = async (req, res) => {
  try {
    const deleted = await Carts.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Cart not found' });
    res.status(200).json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting cart', error: err.message });
  }
};
