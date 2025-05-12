import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role_name: { type: DataTypes.STRING(50) }
}, { tableName: 'role', timestamps: false });

// No foreign key fields in this table.

export default Role;
