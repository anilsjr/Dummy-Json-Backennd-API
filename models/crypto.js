import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Crypto = sequelize.define('Crypto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  coin: { type: DataTypes.STRING(50) },
  wallet: { type: DataTypes.TEXT },
  network: { type: DataTypes.STRING(50) }
}, { tableName: 'crypto', timestamps: false });

// No foreign key fields in this table.

export default Crypto;
