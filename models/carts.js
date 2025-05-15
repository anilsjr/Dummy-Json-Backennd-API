import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Carts = sequelize.define('Carts', {
  id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
  products: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
  total: { type: DataTypes.DECIMAL(10,2), allowNull: true },
  discounted_total: { type: DataTypes.DECIMAL(10,2), allowNull: true },
  total_products: { type: DataTypes.INTEGER, allowNull: true },
  total_quantity: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'carts',
  timestamps: false
});

export default Carts;
