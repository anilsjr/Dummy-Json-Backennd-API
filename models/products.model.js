import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Products = sequelize.define('Products', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255) },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10,2) },
  discount_percentage: { type: DataTypes.FLOAT },
  rating: { type: DataTypes.FLOAT },
  stock: { type: DataTypes.INTEGER },
  brand: { type: DataTypes.STRING(100) },
  sku: { type: DataTypes.STRING(100) },
  weight: { type: DataTypes.FLOAT },
  warranty_information: { type: DataTypes.TEXT },
  shipping_information: { type: DataTypes.TEXT },
  return_policy: { type: DataTypes.TEXT },
  minimum_order_quantity: { type: DataTypes.INTEGER },
  dimensions: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
  category: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
  availability_status: { type: DataTypes.STRING(20), allowNull: true, defaultValue: null },
  tags: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
  reviews: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
  meta: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
  images: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
  thumbnail: { type: DataTypes.STRING(100), allowNull: true, defaultValue: null },
  brand: { type: DataTypes.STRING(50), allowNull: true, defaultValue: null }
}, { tableName: 'products', timestamps: false });

export default Products;
