import axios from 'axios';
import Products from '../models/products.js';
import { sequelize } from '../config/dbConfig.js';

async function importProducts() {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products || response.data;

    for (const product of products) {
      await Products.create({
        title: product.title,
        description: product.description,
        category_id: null,
        price: product.price,
        discount_percentage: product.discountPercentage || null,
        rating: product.rating || null,
        stock: product.stock || null,
        brand: product.brand || null,
        sku: product.sku || null,
        weight: null,
        dimension_id: null,
        warranty_information: null,
        shipping_information: null,
        availability_status_id: null,
        return_policy: null,
        minimum_order_quantity: null,
        meta_id: null,
        thumbnail_id: null
      });
    }
    console.log('Product import complete!');
  } catch (error) {
    console.error('Error importing products:', error);
  } finally {
    await sequelize.close();
  }
}

importProducts();
