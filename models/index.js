import Products from './products.js';
import Categories from './categories.js';

Products.belongsTo(Categories, { foreignKey: 'category_id' });
Categories.hasMany(Products, { foreignKey: 'category_id' });

// ...repeat for all associations