import Products from "../models/Products.model.js";
import { sequelize } from "../config/dbConfig.js";
import { Op } from 'sequelize';
import { isInteger } from '../utility/utils.js';

export const allProducts = async (req, res) => {
    try {
        let {
            limit,
            skip,
            sortBy,
            order,
            search
        } = req.query;

        limit = parseInt(limit);
        skip = parseInt(skip);

        limit = isNaN(limit) || limit <= 0 ? 20 : limit;
        skip = isNaN(skip) || skip <= 0 ? 0 : skip;

        const fields = search;
        const offset = skip;

        const validSortFields = ['id', 'title'];
        sortBy = validSortFields.includes(sortBy) ? sortBy : 'id';
        order = ['ASC', 'DESC'].includes(order?.toUpperCase()) ? order.toUpperCase() : 'ASC';
        const attributes = fields ? fields.split(',') : undefined;

        // Get total count for pagination
        const total = await Products.count();
        const products = await Products.findAll({
            attributes,
            limit,
            offset,
            order: [[sortBy, order]],
        });
        res.status(200).json({ products, total, skip: offset, limit });
    } catch (error) {
        console.error('Error fetching Products:', error);
        res.status(500).json({ message: 'Error fetching Products', error: error.message });
    }
};

export const searchProductsByTitle = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: 'Query parameter q is required' });
    }
    try {
        const products = await Products.findAll({
            where: {
                 title: { [Op.like]: `%${q}%` } 
            }
        });
        if (products.length > 0) {
            return res.status(200).json({ products, total: products.length });
        }
        return res.status(404).json({ message: `No Products found with name: ${q}` });
    } catch (error) {
        console.error('Error searching Products:', error);
        res.status(500).json({ message: 'Error searching Products', error: error.message });
    }
};

export const searchProductsyMealType = async (req, res) => {
    const mealType = req.params.mealType.toLowerCase();
    try {
        // Use parameterized query to prevent SQL injection
        const products = await sequelize.query(
            `SELECT * FROM Products WHERE JSON_CONTAINS(LOWER(JSON_EXTRACT(tags, '$[*]')), :mealType)`,
            {
                replacements: { mealType: `"${mealType}"` },
                model: Products,
                mapToModel: true
            }
        );
        if (Products.length > 0) {
            return res.status(200).json({ products, total: Products.length });
        }
        return res.status(404).json({ message: `No Products found with meal-type: ${mealType}` });
    } catch (error) {
        console.error('Error fetching Products by meal-type:', error);
        res.status(500).json({ message: 'Error fetching Products by meal-type', error: error.message });
    }
};

export const getAllTags = async (req, res) => {
    try {
        const [results] = await sequelize.query(`
            SELECT DISTINCT jt.tag AS unique_tag
            FROM Products, JSON_TABLE(Products.tags, '$[*]' COLUMNS (tag VARCHAR(50) PATH '$')) AS jt
        `);
        const tags = results.map(row => row.unique_tag);
        res.status(200).json({ tags, total: tags.length });
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ message: 'Error fetching tags', error: error.message });
    }
};

export const searchProductsyTagName = async (req, res) => {
    const { tagName } = req.params;
    try {
        // Use parameterized query for safety
        const products = await sequelize.query(
            `SELECT * FROM Products WHERE LOWER(JSON_UNQUOTE(tags->'$[*]')) LIKE :tagName`,
            {
                replacements: { tagName: `%${tagName.toLowerCase()}%` },
                model: Products,
                mapToModel: true
            }
        );
        if (products.length > 0) {
            return res.status(200).json({ products, total: products.length });
        }
        return res.status(404).json({ message: `No Products found with tag: ${tagName}` });
    } catch (error) {
        console.error('Error fetching Productsby tag:', error);
        res.status(500).json({ message: 'Error fetching Products', error: error.message });
    }
};

export const searchProductById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!isInteger(id)) {
            return res.status(400).json({ message: 'Productsid must be an integer', input: `You provided: ${id}` });
        }
        const products= await Products.findByPk(id);
        if (products){
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: `Productswith id '${id}' NOT found` });
        }
    } catch (error) {
        console.error('Error fetching Productsby id:', error);
        res.status(500).json({ message: 'Error fetching Products', error: error.message });
    }
};

// Dummy logic for POST, PUT, DELETE
export const addProduct = (req, res) => {
    res.status(201).json({ message: 'Product added (dummy logic)' });
};

export const updateProduct = (req, res) => {
    res.status(200).json({ message: `Product ${req.params.id} updated (dummy logic)` });
};

export const deleteProduct = (req, res) => {
    res.status(200).json({ message: `Product ${req.params.id} deleted (dummy logic)` });
};

