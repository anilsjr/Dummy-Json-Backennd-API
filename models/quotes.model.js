import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Quotes = sequelize.define('Quotes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quote: { type: DataTypes.TEXT },
  author: { type: DataTypes.STRING(255) }
}, { tableName: 'quotes', timestamps: false });

export default Quotes;
