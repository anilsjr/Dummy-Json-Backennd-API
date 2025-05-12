import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

// No foreign key fields in this table.

const Coordinates = sequelize.define('Coordinates', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lat: { type: DataTypes.FLOAT },
  lng: { type: DataTypes.FLOAT }
}, { tableName: 'coordinates', timestamps: false });

export default Coordinates;
