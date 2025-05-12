import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Products = sequelize.define('Products', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255) },
  description: { type: DataTypes.TEXT },
  category_id: { type: DataTypes.INTEGER, references: { model: 'categories', key: 'id' } },
  price: { type: DataTypes.DECIMAL(10,2) },
  discount_percentage: { type: DataTypes.FLOAT },
  rating: { type: DataTypes.FLOAT },
  stock: { type: DataTypes.INTEGER },
  brand: { type: DataTypes.STRING(100) },
  sku: { type: DataTypes.STRING(100) },
  weight: { type: DataTypes.FLOAT },
  dimension_id: { type: DataTypes.INTEGER, references: { model: 'dimensions', key: 'id' } },
  warranty_information: { type: DataTypes.TEXT },
  shipping_information: { type: DataTypes.TEXT },
  availability_status_id: { type: DataTypes.INTEGER, references: { model: 'availability_status', key: 'id' } },
  return_policy: { type: DataTypes.TEXT },
  minimum_order_quantity: { type: DataTypes.INTEGER },
  meta_id: { type: DataTypes.INTEGER, references: { model: 'meta', key: 'id' } },
  thumbnail_id: { type: DataTypes.INTEGER, references: { model: 'images', key: 'id' } }
}, { tableName: 'products', timestamps: false });

export default Products;
