import { Sequelize } from "sequelize";
import express from "express";
import {rectangleImage} from '../controller/dynamicImage.controller.js';

const router = express.Router();

// router.get('/:SIZE', squareImage);
router.get('/:SIZE', rectangleImage); // sqr, rect WxH
router.get('/:SIZE/:colour', rectangleImage); // sqr, rect WxH , ?text=TEXT, type=webp/png/jpeg, fontFamily=pacifico, fonSize=,  
router.get('/icon'); //    /HASH/SIZE?type=png/jpeg/webp


export default router;