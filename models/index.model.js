import Products from './products.model.js';
import Categories from './categories.js';
import Recipes from './recipes.model.js';
import Ingredients from './ingredients.js';
import Instructions from './instructions.js';
import Users from './users.model.js';
import Hair from './hair.js';
import Addresses from './addresses.js';

// Product associations
Products.belongsTo(Categories, { foreignKey: 'category_id' });
Categories.hasMany(Products, { foreignKey: 'category_id' });

// Recipes associations
Recipes.belongsTo(Users, { foreignKey: 'user_id' });
Recipes.belongsTo(Instructions, { foreignKey: 'instruction_id' });
Recipes.belongsTo(Ingredients, { foreignKey: 'ingredient_id' });
Users.hasMany(Recipes, { foreignKey: 'user_id' });
Instructions.hasMany(Recipes, { foreignKey: 'instruction_id' });
Ingredients.hasMany(Recipes, { foreignKey: 'ingredient_id' });

// Users associations
Users.belongsTo(Hair, { foreignKey: 'hair_id' });
Hair.hasMany(Users, { foreignKey: 'hair_id' });
Users.belongsTo(Addresses, { foreignKey: 'address_id' });
Addresses.hasMany(Users, { foreignKey: 'address_id' });

// ...add more as needed for other models