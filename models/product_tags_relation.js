import { DataTypes } from 'sequelize';
import sequelize from '../config/db_config.js';

const ProductTagsRelation = sequelize.define('ProductTagsRelation', {
  product_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'products', key: 'id' } },
  tag_id: { type: DataTypes.INTEGER, primaryKey: true, references: { model: 'product_tags', key: 'id' } }
}, { tableName: 'product_tags_relation', timestamps: false });

export default ProductTagsRelation;
