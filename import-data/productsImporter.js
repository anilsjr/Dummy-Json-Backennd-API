import axios from 'axios';
import Products from '../models/products.model.js';
import { sequelize } from '../config/dbConfig.js';

async function importProducts() {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=100000&skip=0');
    const products = response.data.products || response.data;

    for (const product of products) {
      await Products.create({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        discount_percentage: product.discountPercentage || null,
        rating: product.rating || null,
        stock: product.stock || null,
        brand: product.brand || null,
        sku: product.sku || null,
        weight: product.weight || null,
        warranty_information: product.warrantyInformation ||  null,
        shipping_information: product.shippingInformation || null,
        return_policy: product.returnPolicy || null,
        minimum_order_quantity: product.minimumOrderQuantity || null,
        dimensions: product.dimensions || null,
        category: product.category || null,
        availability_status: product.availabilityStatus || null,
        tags: product.tags || null,
        reviews: product.reviews || null,
        meta: product.meta || null,
        images: product.images || null,
        thumbnail: product.thumbnail || null
      });
    console.log('Product brand : ', product.brand);

    }
    console.log('Product import complete!');
  } catch (error) {
    console.error('Error importing products:', error.message);
  } finally {
    await sequelize.close();
  }
}

importProducts();
