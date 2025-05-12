import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const Reviews = sequelize.define('Reviews', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.FLOAT },
  comment: { type: DataTypes.TEXT },
  review_date: { type: DataTypes.DATE },
  reviewer_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'id' } }
}, { tableName: 'reviews', timestamps: false });

export default Reviews;
