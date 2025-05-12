import { sequelize } from './config/dbConfig.js';
import User from './models/users.js';
import Product from './models/products.js';

const createDummyUsers = () => {
  const users = [];
  for (let i = 1; i <= 30; i++) {
    users.push({
      name: `User${i}`,
      email: `user${i}@example.com`,
      password: 'password123',
      // Add other required fields as per your User model
    });
  }
  return users;
};

const createDummyProducts = () => {
  const products = [];
  for (let i = 1; i <= 30; i++) {
    products.push({
      name: `Product${i}`,
      description: `Description for product ${i}`,
      price: (Math.random() * 100).toFixed(2),
      // Add other required fields as per your Product model
    });
  }
  return products;
};

const seed = async () => {
  try {
    await sequelize.sync({ force: false }); // Don't drop tables, just insert
    await User.bulkCreate(createDummyUsers());
    await Product.bulkCreate(createDummyProducts());
    console.log('Inserted 30 dummy users and products!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
