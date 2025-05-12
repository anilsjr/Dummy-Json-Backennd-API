import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Categories = sequelize.define('Categories', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category_name: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'categories', timestamps: false });

export default Categories;
