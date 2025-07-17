import Posts from "../models/posts.model.js";
import { sequelize } from "../config/dbConfig.js";
import { Op } from 'sequelize';
import { isInteger } from '../utility/utils.js';

export const allPosts = async (req, res) => {
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

        const offset = skip;
        const fields = search;

        const validSortFields = ['id', 'title'];
        sortBy = validSortFields.includes(sortBy) ? sortBy : 'id';
        order = ['ASC', 'DESC'].includes(order?.toUpperCase()) ? order.toUpperCase() : 'ASC';
        const attributes = fields ? fields.split(',') : undefined;

        // Get total count for pagination
        const total = await Posts.count();
        const posts = await Posts.findAll({
            attributes,
            limit,
            offset,
            order: [[sortBy, order]],
        });
        res.status(200).json({ posts, total, skip: offset, limit });
    } catch (error) {
        console.error('Error fetching Posts:', error);
        res.status(500).json({ message: 'Error fetching Posts', error: error.message });
    }
};

export const searchPosts = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: 'Query parameter q is required' });
    }
    try {
       const posts = await Posts.findAll({
        where: {
            [Op.and]: [
            {
                [Op.or]: [
                { title: { [Op.like]: `%${q}%` } },
                { body: { [Op.like]: `%${q}%` } }
                ]
            },
            sequelize.where(
                sequelize.fn(
                'LOWER',
                sequelize.fn('JSON_UNQUOTE', sequelize.literal("JSON_EXTRACT(tags, '$[*]')"))
                ),
                {
                [Op.like]: `%${q.toLowerCase()}%`
                }
            )
            ]
        }
        });


        if (posts.length > 0) {
            return res.status(200).json({ posts, total: posts.length });
        }
        return res.status(404).json({ message: `No Posts found ` });
    } catch (error) {
        console.error('Error searching Posts:', error);
        res.status(500).json({ message: 'Error searching Posts', error: error.message });
    }
};

// export const searchPostByMealType = async (req, res) => {
//     const mealType = req.params.mealType.toLowerCase();
//     try {
//         // Use parameterized query to prevent SQL injection
//         const Posts = await sequelize.query(
//             `SELECT * FROM Posts WHERE JSON_CONTAINS(LOWER(JSON_EXTRACT(meal_type, '$[*]')), :mealType)`,
//             {
//                 replacements: { mealType: `"${mealType}"` },
//                 model: Posts,
//                 mapToModel: true
//             }
//         );
//         if (Posts.length > 0) {
//             return res.status(200).json({ Posts, total: Posts.length });
//         }
//         return res.status(404).json({ message: `No Posts found with meal-type: ${mealType}` });
//     } catch (error) {
//         console.error('Error fetching Posts by meal-type:', error);
//         res.status(500).json({ message: 'Error fetching Posts by meal-type', error: error.message });
//     }
// };

export const getAllTags = async (req, res) => {
    try {
        const [results] = await sequelize.query(`
            SELECT DISTINCT jt.tag AS unique_tag
            FROM Posts, JSON_TABLE(Posts.tags, '$[*]' COLUMNS (tag VARCHAR(50) PATH '$')) AS jt
        `);
        const tags = results.map(row => row.unique_tag);
        res.status(200).json({ tags, total: tags.length });
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ message: 'Error fetching tags', error: error.message });
    }
};

export const searchPostByTagName = async (req, res) => {
    const { tagName } = req.params;
    try {
        // Use parameterized query for safety
        const posts = await sequelize.query(
            `SELECT * FROM Posts WHERE LOWER(JSON_UNQUOTE(tags->'$[*]')) LIKE :tagName`,
            {
                replacements: { tagName: `%${tagName.toLowerCase()}%` },
                model: Posts,
                mapToModel: true
            }
        );
        if (posts.length > 0) {
            return res.status(200).json({ posts, total: posts.length });
        }
        return res.status(404).json({ message: `No Posts found with tag: ${tagName}` });
    } catch (error) {
        console.error('Error fetching Post by tag:', error);
        res.status(500).json({ message: 'Error fetching Post', error: error.message });
    }
};

export const searchPostById = async (req, res) => {
    let { id } = req.params;
    try {
        id = parseInt(id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Post id must be an integer', input: `You provided: ${id}` });
        }
        const Post = await Posts.findByPk(id);
        if (Post) {
            res.status(200).json(Post);
        } else {
            res.status(404).json({ message: `Post with id '${id}' NOT found` });
        }
    } catch (error) {
        console.error('Error fetching Post by id:', error);
        res.status(500).json({ message: 'Error fetching Post', error: error.message });
    }
};

// Dummy logic for POST, PUT, DELETE
export const addPost = (req, res) => {
    res.status(201).json({ message: 'Post added (dummy logic)' });
};

export const updatePost = (req, res) => {
    res.status(200).json({ message: `Post ${req.params.id} updated (dummy logic)` });
};

export const deletePost = (req, res) => {
    res.status(200).json({ message: `Post ${req.params.id} deleted (dummy logic)` });
};

