import Comments from '../models/comments.js'
import { sequelize } from "../config/dbConfig.js";
import { Op, Sequelize } from 'sequelize';
import { isInteger } from '../utility/utils.js';

export const allComments = async (req, res) => {
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

        const validSortFields = ['id', 'Comments', 'user_id'];
        sortBy = validSortFields.includes(sortBy) ? sortBy : 'id';
        order = ['ASC', 'DESC'].includes(order?.toUpperCase()) ? order.toUpperCase() : 'ASC';
        const attributes = fields ? fields.split(',') : undefined;

        // Get total count for pagination
        const total = await Comments.count();
        const comments = await Comments.findAll({
            attributes,
            limit,
            offset,
            order: [[sortBy, order]],
        });
        res.status(200).json({ comments, total, skip: offset, limit });
    } catch (error) {
        console.error('Error fetching Comments:', error);
        res.status(500).json({ message: 'Error fetching Comments', error: error.message });
    }
}

export const searchCommentById = async (req, res) => {
    let { id } = req.params;
    try {
        id = parseInt(id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Comments id must be an integer', input: `You provided: ${id}` });
        }
        const comments = await Comments.findByPk(id);
        if (comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({ message: `Comments with id '${id}' NOT found` });
        }
    } catch (error) {
        console.error('Error fetching Comments by id:', error);
        res.status(500).json({ message: 'Error fetching Comments', error: error.message });
    }
};

export const searchCommentsByPostId = async (req, res) => {
    let { id } = req.params;
    try {
        id = parseInt(id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'user-id must be an integer', input: `You provided: ${id}` });
        }
        const comments = await Comments.findAll({
            where: {
                post_id: id
            }
        });
        if (comments) {
            res.status(200).json({comments:comments});
        } else {
            res.status(404).json({ message: `comments with user-id : '${id}' NOT found` });
        }
    } catch (error) {
        console.error('Error fetching Comments by id:', error);
        res.status(500).json({ message: 'Error fetching Comments', error: error.message });
    }
};

