import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Dimensions = sequelize.define('Dimensions', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  width: { type: DataTypes.FLOAT },
  height: { type: DataTypes.FLOAT },
  depth: { type: DataTypes.FLOAT }
}, { tableName: 'dimensions', timestamps: false });

export default Dimensions;
