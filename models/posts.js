import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Posts = sequelize.define('Posts', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.TEXT },
  tags: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
  reactions: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
  views: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  user_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'posts',
  timestamps: false
});

export default Posts;
