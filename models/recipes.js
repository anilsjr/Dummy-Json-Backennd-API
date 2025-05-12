import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Recipes = sequelize.define('Recipes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255) },
  ingredients: { type: DataTypes.TEXT }, // JSON or comma-separated
  instructions: { type: DataTypes.TEXT }, // JSON or text
  prep_time_minutes: { type: DataTypes.INTEGER },
  cook_time_minutes: { type: DataTypes.INTEGER },
  servings: { type: DataTypes.INTEGER },
  cuisine: { type: DataTypes.STRING(100) },
  calories_per_serving: { type: DataTypes.INTEGER },
  tags: { type: DataTypes.TEXT }, // JSON or comma-separated
  user_id: { type: DataTypes.INTEGER },
  image: { type: DataTypes.TEXT }
}, { tableName: 'recipes', timestamps: false });

export default Recipes;
