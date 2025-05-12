import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const AvailabilityStatus = sequelize.define('AvailabilityStatus', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status: { type: DataTypes.STRING(50), allowNull: false, validate: { isIn: [['In Stock', 'Low Stock', 'Out of Stock']] } }
}, { tableName: 'availability_status', timestamps: false });

export default AvailabilityStatus;
