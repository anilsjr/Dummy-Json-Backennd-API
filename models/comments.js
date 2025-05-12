import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Comments = sequelize.define('Comments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  body: { type: DataTypes.TEXT },
  post_id: { type: DataTypes.INTEGER },
  user_id: { type: DataTypes.INTEGER }
}, { tableName: 'comments', timestamps: false });

export default Comments;
