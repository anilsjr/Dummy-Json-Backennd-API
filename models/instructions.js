import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Instructions = sequelize.define('Instructions', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  instruction_step: { type: DataTypes.TEXT }
}, { tableName: 'instructions', timestamps: false });

// No foreign key fields in this table.

export default Instructions;
