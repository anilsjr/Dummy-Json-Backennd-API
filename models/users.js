import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Users = sequelize.define('Users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING(100) },
  last_name: { type: DataTypes.STRING(100) },
  middle_name: { type: DataTypes.STRING(100) },
  phone: { type: DataTypes.STRING(20) },
  username: { type: DataTypes.STRING(50), unique: true },
  email: { type: DataTypes.STRING(255), unique: true },
  password: { type: DataTypes.TEXT },
  image: { type: DataTypes.TEXT },
  blood_group: { type: DataTypes.STRING(5) },
  height: { type: DataTypes.FLOAT },
  weight: { type: DataTypes.FLOAT },
  eye_color: { type: DataTypes.STRING(50) },
  hair_id: { type: DataTypes.INTEGER, references: { model: 'hair', key: 'id' } },
  address_id: { type: DataTypes.INTEGER, references: { model: 'addresses', key: 'id' } },
  dob: { type: DataTypes.DATE },
  access_token: { type: DataTypes.TEXT },
  refresh_token: { type: DataTypes.TEXT }
}, { tableName: 'users', timestamps: false });

export default Users;
