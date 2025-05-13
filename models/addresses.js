import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Addresses = sequelize.define('Addresses', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  address: { type: DataTypes.TEXT },
  city: { type: DataTypes.STRING(100) },
  state: { type: DataTypes.STRING(100) },
  state_code: { type: DataTypes.STRING(10) },
  postal_code: { type: DataTypes.STRING(20) },
  country: { type: DataTypes.STRING(100) },
  coordinates_id: { type: DataTypes.INTEGER, references: { model: 'coordinates', key: 'id' } },
  mac_address: { type: DataTypes.STRING(50) },
  university: { type: DataTypes.STRING(100) },
  bank_id: { type: DataTypes.INTEGER, references: { model: 'bank', key: 'id' } },
  company_id: { type: DataTypes.INTEGER, references: { model: 'company', key: 'id' } },
  ein_ssn: { type: DataTypes.STRING(20) },
  user_agent: { type: DataTypes.TEXT },
  crypto_id: { type: DataTypes.INTEGER, references: { model: 'crypto', key: 'id' } },
  role_id: { type: DataTypes.INTEGER, references: { model: 'role', key: 'id' } }
}, { tableName: 'addresses', timestamps: false });


export default Addresses;
