import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Recipes = sequelize.define('Recipes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255) },
  ingredients: { type: DataTypes.JSON, allowNull: false },
  instructions: { type: DataTypes.JSON, allowNull: false },
  prep_time_minutes: { type: DataTypes.INTEGER },
  cook_time_minutes: { type: DataTypes.INTEGER },
  servings: { type: DataTypes.INTEGER },
  difficulty: { type: DataTypes.STRING(50) },
  cuisine: { type: DataTypes.STRING(100) },
  calories_per_serving: { type: DataTypes.INTEGER },
  tags: { type: DataTypes.JSON, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: true },
  image: { type: DataTypes.TEXT },
  rating: { type: DataTypes.FLOAT },
  review_count: { type: DataTypes.INTEGER },
  meal_type: { type: DataTypes.JSON, allowNull: true },
}, { tableName: 'recipes', timestamps: false });

export default Recipes;
