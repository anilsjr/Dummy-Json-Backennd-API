import express from "express";

import {allQuotes, searchQuoteRandomly, searchQuoteById} from '../controller/quotes.controller.js'

const router = express.Router();

router.get('/', allQuotes);
router.get('/random', searchQuoteRandomly);
router.get('/:id', searchQuoteById);

//add update delete Quotes --> make them wrong fake donot change the update the database tables
export default router;