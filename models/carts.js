import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Carts = sequelize.define('Carts', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER },
  total: { type: DataTypes.DECIMAL(10,2) },
  discounted_total: { type: DataTypes.DECIMAL(10,2) },
  total_products: { type: DataTypes.INTEGER },
  total_quantity: { type: DataTypes.INTEGER }
}, { tableName: 'carts', timestamps: false });

export default Carts;
