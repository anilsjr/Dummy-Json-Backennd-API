import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const ProductImages = sequelize.define('ProductImages', {
  product_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'products', key: 'id' } },
  image_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'images', key: 'id' } }
}, { tableName: 'product_images', timestamps: false });

export default ProductImages;
