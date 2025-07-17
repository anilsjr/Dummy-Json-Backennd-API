import express from "express";

import { allComments, searchCommentById, searchCommentsByPostId, addComment, updateComment, deleteComment } from "../controller/comments.controller.js";

const router = express.Router();

// get all the comments with limit skip sort
router.get('/',  allComments);
//get comments by post id
router.get('/post/:id', searchCommentsByPostId);
// Get a single recipe by ID
router.get('/:id', searchCommentById);


// add comment
router.post('/', addComment);
// update comment
router.put('/:id', updateComment);
// delete comment
router.delete('/:id', deleteComment);

export default router;