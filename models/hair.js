import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Hair = sequelize.define('Hair', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING(50) },
  color: { type: DataTypes.STRING(50) }
}, { tableName: 'hair', timestamps: false });

// No foreign key fields in this table.

export default Hair;
