import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Meta = sequelize.define('Meta', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  barcode: { type: DataTypes.BIGINT },
  qr_code: { type: DataTypes.TEXT }
}, { tableName: 'meta', timestamps: false });

export default Meta;