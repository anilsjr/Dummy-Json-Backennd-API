import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Ingredients = sequelize.define('Ingredients', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ingredient_name: { type: DataTypes.STRING(255) }
}, { tableName: 'ingredients', timestamps: false });

// No foreign key fields in this table.

export default Ingredients;
