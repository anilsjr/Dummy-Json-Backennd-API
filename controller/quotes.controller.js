import Quotes from '../models/quotes.js'
import { sequelize } from "../config/dbConfig.js";
import { Op, Sequelize } from 'sequelize';
import { isInteger } from '../utility/utils.js';

export const allQuotes = async (req, res) => {
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

        const validSortFields = ['id', 'quotes', 'author'];
        sortBy = validSortFields.includes(sortBy) ? sortBy : 'id';
        order = ['ASC', 'DESC'].includes(order?.toUpperCase()) ? order.toUpperCase() : 'ASC';
        const attributes = fields ? fields.split(',') : undefined;

        // Get total count for pagination
        const total = await Quotes.count();
        const quotes = await Quotes.findAll({
            attributes,
            limit,
            offset,
            order: [[sortBy, order]],
        });
        res.status(200).json({ quotes, total, skip: offset, limit });
    } catch (error) {
        console.error('Error fetching Quotes:', error);
        res.status(500).json({ message: 'Error fetching Quotes', error: error.message });
    }
}

export const searchQuoteById = async (req, res) => {
    let { id } = req.params;
    try {
        id = parseInt(id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'quotes id must be an integer', input: `You provided: ${id}` });
        }
        const quotes = await Quotes.findByPk(id);
        if (quotes) {
            res.status(200).json(quotes);
        } else {
            res.status(404).json({ message: `quotes with id '${id}' NOT found` });
        }
    } catch (error) {
        console.error('Error fetching quotes by id:', error);
        res.status(500).json({ message: 'Error fetching quotes', error: error.message });
    }
};

export const searchQuoteRandomly = async (req, res) => {
    try {
        const quotes = await Quotes.findOne({
            order: sequelize.random()
        });
        if (quotes) {
            res.status(200).json({ quotes });
        } else {
            res.status(404).json({ message: 'No quotes found' });
        }
    } catch (error) {
        console.error('Error fetching random quotes:', error);
        res.status(500).json({ message: 'Error fetching random quotes', error: error.message });
    }
};

