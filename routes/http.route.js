import express from "express";
import { customHttpResponse, searchHttpByCode } from "../controller/http.controller.js";


const router = express.Router();

router.get('/:code/:messageValue', customHttpResponse);
router.get('/:code', searchHttpByCode);

//add update delete todos --> make them wrong fake donot change the update the database tables


export default router;