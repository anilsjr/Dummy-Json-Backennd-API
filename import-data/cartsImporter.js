import axios from 'axios';
import Carts from '../models/carts.js';
import CartItems from '../models/cart_items.js';
import { sequelize } from '../config/dbConfig.js';

async function importCarts() {
  try {
    const response = await axios.get('https://dummyjson.com/carts');
    const carts = response.data.carts || response.data;
    let i = 1;
    for (const cart of carts) {
      const cartRecord = await Carts.create({
        id: i++ ,
        user_id: cart.userId,
        total: cart.total,
        discounted_total: cart.discountedTotal,
        total_products: cart.totalProducts,
        total_quantity: cart.totalQuantity
      });
      for (const product of cart.products) {
        await CartItems.create({
          cart_id: cartRecord.id ,
          product_id: (i)++ + 21,
          quantity: product.quantity,
          price: product.price,
          total: product.total,
          discount_percentage: product.discountPercentage,
          discounted_price: product.discountedPrice
        });
      }
    }
    console.log('Cart import complete!');
  } catch (error) {
    console.error('Error importing carts:', error);
  } finally {
    await sequelize.close();
  }
}

importCarts();
