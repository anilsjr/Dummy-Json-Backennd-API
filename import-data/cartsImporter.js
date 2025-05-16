import axios from 'axios';
import Carts from '../models/carts.model.js';
import { sequelize } from '../config/dbConfig.js';

async function importCarts() {
  try {
    const response = await axios.get('https://dummyjson.com/carts?limit=30');
    const carts = response.data.carts || response.data;
    let i = 1;
    for (const cart of carts) {
      await Carts.create({
        id: cart.id || i++,
        products: cart.products || [],
        total: cart.total,
        discounted_total: cart.discountedTotal,
        total_products: cart.totalProducts,
        total_quantity: cart.totalQuantity
      });
    }
    console.log('Cart import complete!');
  } catch (error) {
    console.error('Error importing carts:', error);
  } finally {
    await sequelize.close();
  }
}

importCarts();
