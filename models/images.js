import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Images = sequelize.define('Images', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  link: { type: DataTypes.TEXT, allowNull: false }
}, { tableName: 'images', timestamps: false });

export default Images;