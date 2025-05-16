import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Todos = sequelize.define('Todos', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  todo: { type: DataTypes.STRING(255) },
  completed: { type: DataTypes.BOOLEAN },
  user_id: { type: DataTypes.INTEGER }
}, { tableName: 'todos', timestamps: false });

export default Todos;
