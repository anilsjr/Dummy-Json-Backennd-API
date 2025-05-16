import Recipes from "../models/recipes.model.js";
import { sequelize } from "../config/dbConfig.js";
import { Op } from 'sequelize';
import { isInteger } from '../utility/utils.js';

export const allRecipes = async (req, res) => {
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

        const validSortFields = ['id', 'name'];
        sortBy = validSortFields.includes(sortBy) ? sortBy : 'id';
        order = ['ASC', 'DESC'].includes(order?.toUpperCase()) ? order.toUpperCase() : 'ASC';
        const attributes = fields ? fields.split(',') : undefined;

        // Get total count for pagination
        const total = await Recipes.count();
        const recipes = await Recipes.findAll({
            attributes,
            limit,
            offset: skip,
            order: [[sortBy, order]],
        });
        res.status(200).json({ recipes, total, skip: offset, limit });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Error fetching recipes', error: error.message });
    }
};

export const searchRecipeByName = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: 'Query parameter q is required' });
    }
    try {
        const recipes = await Recipes.findAll({
            where: {
                name: { [Op.like]: `%${q}%` }
            }
        });
        if (recipes.length > 0) {
            return res.status(200).json({ recipes, total: recipes.length });
        }
        return res.status(404).json({ message: `No recipes found with name: ${q}` });
    } catch (error) {
        console.error('Error searching recipes:', error);
        res.status(500).json({ message: 'Error searching recipes', error: error.message });
    }
};

export const searchRecipeByMealType = async (req, res) => {
    const mealType = req.params.mealType.toLowerCase();
    try {
        // Use parameterized query to prevent SQL injection
        const recipes = await sequelize.query(
            `SELECT * FROM recipes WHERE JSON_CONTAINS(LOWER(JSON_EXTRACT(meal_type, '$[*]')), :mealType)`,
            {
                replacements: { mealType: `"${mealType}"` },
                model: Recipes,
                mapToModel: true
            }
        );
        if (recipes.length > 0) {
            return res.status(200).json({ recipes, total: recipes.length });
        }
        return res.status(404).json({ message: `No recipes found with meal-type: ${mealType}` });
    } catch (error) {
        console.error('Error fetching recipes by meal-type:', error);
        res.status(500).json({ message: 'Error fetching recipes by meal-type', error: error.message });
    }
};

export const getAllTags = async (req, res) => {
    try {
        const [results] = await sequelize.query(`
            SELECT DISTINCT jt.tag AS unique_tag
            FROM recipes, JSON_TABLE(recipes.tags, '$[*]' COLUMNS (tag VARCHAR(50) PATH '$')) AS jt
        `);
        const tags = results.map(row => row.unique_tag);
        res.status(200).json({ tags, total: tags.length });
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ message: 'Error fetching tags', error: error.message });
    }
};

export const searchRecipeByTagName = async (req, res) => {
    const { tagName } = req.params;
    try {
        // Use parameterized query for safety
        const recipes = await sequelize.query(
            `SELECT * FROM recipes WHERE LOWER(JSON_UNQUOTE(tags->'$[*]')) LIKE :tagName`,
            {
                replacements: { tagName: `%${tagName.toLowerCase()}%` },
                model: Recipes,
                mapToModel: true
            }
        );
        if (recipes.length > 0) {
            return res.status(200).json({ recipes, total: recipes.length });
        }
        return res.status(404).json({ message: `No recipes found with tag: ${tagName}` });
    } catch (error) {
        console.error('Error fetching recipe by tag:', error);
        res.status(500).json({ message: 'Error fetching recipe', error: error.message });
    }
};

export const searchRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!isInteger(id)) {
            return res.status(400).json({ message: 'Recipe id must be an integer', input: `You provided: ${id}` });
        }
        const recipe = await Recipes.findByPk(id);
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ message: `Recipe with id '${id}' NOT found` });
        }
    } catch (error) {
        console.error('Error fetching recipe by id:', error);
        res.status(500).json({ message: 'Error fetching recipe', error: error.message });
    }
};

// Dummy logic for POST, PUT, DELETE
export const addRecipe = (req, res) => {
    res.status(201).json({ message: 'Recipe added (dummy logic)' });
};

export const updateRecipe = (req, res) => {
    res.status(200).json({ message: `Recipe ${req.params.id} updated (dummy logic)` });
};

export const deleteRecipe = (req, res) => {
    res.status(200).json({ message: `Recipe ${req.params.id} deleted (dummy logic)` });
};

