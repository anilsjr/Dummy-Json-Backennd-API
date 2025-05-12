import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const StatusDetails = sequelize.define('StatusDetails', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  status_code: { type: DataTypes.INTEGER, allowNull: false },
  status_message: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'status_details', timestamps: false });

export default StatusDetails;