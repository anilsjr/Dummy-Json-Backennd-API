import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const CartItems = sequelize.define('CartItems', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cart_id: { type: DataTypes.INTEGER, references: { model: 'carts', key: 'id' } },
  product_id: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER },
  price: { type: DataTypes.DECIMAL(10,2) },
  total: { type: DataTypes.DECIMAL(10,2) },
  discount_percentage: { type: DataTypes.FLOAT },
  discounted_price: { type: DataTypes.DECIMAL(10,2) }
}, { tableName: 'cart_items', timestamps: false });

export default CartItems;
