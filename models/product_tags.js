import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const ProductTags = sequelize.define('ProductTags', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tag_name: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'product_tags', timestamps: false });

export default ProductTags;
