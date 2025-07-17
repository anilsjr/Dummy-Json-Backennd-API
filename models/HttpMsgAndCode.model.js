import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';
import { HttpStatusCode } from 'axios';

const HttpMsgAndCode = sequelize.define('HttpStatusCode', {
  status: { type: DataTypes.INTEGER, primaryKey: true},
  message: { type: DataTypes.STRING(100) },
    description: { type: DataTypes.STRING(1000) },
}, { tableName: 'http_msg_and_code', timestamps: false });

export default HttpMsgAndCode;
