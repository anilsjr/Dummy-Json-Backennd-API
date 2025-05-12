import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Bank = sequelize.define('Bank', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  card_expire: { type: DataTypes.DATE },
  card_number: { type: DataTypes.STRING(20) },
  card_type: { type: DataTypes.STRING(20) },
  currency: { type: DataTypes.STRING(10) },
  iban: { type: DataTypes.STRING(34) }
}, { tableName: 'bank', timestamps: false });

// No foreign key fields in this table.

export default Bank;
