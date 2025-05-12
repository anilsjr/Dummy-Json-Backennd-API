import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Company = sequelize.define('Company', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  department: { type: DataTypes.STRING(100) },
  name: { type: DataTypes.STRING(100) },
  title: { type: DataTypes.STRING(100) },
  address_id: { type: DataTypes.INTEGER, references: { model: 'addresses', key: 'id' } }
}, { tableName: 'company', timestamps: false });

export default Company;
