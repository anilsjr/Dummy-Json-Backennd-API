import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Users = sequelize.define('Users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING(100) },
  last_name: { type: DataTypes.STRING(100) },
  middle_name : {type: DataTypes.STRING(100)},
  phone: { type: DataTypes.STRING(20) },
  username: { type: DataTypes.STRING(50), unique: true },
  email: { type: DataTypes.STRING(255), unique: true },
  password: { type: DataTypes.TEXT },
  image: { type: DataTypes.TEXT },
  blood_group: { type: DataTypes.STRING(5) },
  height: { type: DataTypes.FLOAT },
  weight: { type: DataTypes.FLOAT },
  eye_color: { type: DataTypes.STRING(50) },
  dob: { type: DataTypes.DATE },
  birth_date: { type: DataTypes.DATE, defaultValue: sequelize.col('dob') },
  gender: { type: DataTypes.STRING(20) },
  hair: { type: DataTypes.JSON, allowNull:true, defaultValue:null},
  address: {type: DataTypes.JSON, allowNull:null, defaultValue:null },
  bank: {type: DataTypes.JSON,  allowNull:null, defaultValue:null },
  ip: {type: DataTypes.STRING(20), allowNull:true, defaultValue: null},
  mac_address: {type: DataTypes.STRING(20), allowNull:true, defaultValue: null},
  university: {type: DataTypes.STRING(200), allowNull:true, defaultValue: null},
  bank: {type: DataTypes.JSON,  allowNull:null, defaultValue:null },
  company: {type: DataTypes.JSON,  allowNull:null, defaultValue:null },
  ein: {type: DataTypes.STRING(20),  allowNull:null, defaultValue:null },
  user_agent: {type: DataTypes.STRING(500),  allowNull:null, defaultValue:null },
  ssn: {type: DataTypes.STRING(20),  allowNull:null, defaultValue:null },
  crypto: {type: DataTypes.JSON,  allowNull:null, defaultValue:null },
  role : {type: DataTypes.STRING(20),  allowNull:null, defaultValue:null }

}, { 
  tableName: 'users', 
  timestamps: false,
  getterMethods: {
    age() {
      if (!this.dob) return null;
      const today = new Date();
      const birthDate = new Date(this.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  }
});

export default Users;
