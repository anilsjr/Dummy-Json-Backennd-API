import express from "express";

import { allPosts, searchPostById, searchPostByTagName, searchPosts, getAllTags, addPost, updatePost, deletePost } from "../controller/posts.controller.js";

const router = express.Router();

// get all the recipes with limit skip sort
router.get('/',  allPosts);
// Search recipes by query
router.get('/search', searchPosts);
// router.get('/meal-type/:mealType', searchPosts);
// Get all unique tags from recipes
router.get('/tags', getAllTags);
//get recipes by tag name
router.get('/tag/:tagName', searchPostByTagName);
// Get a single recipe by ID
router.get('/:id', searchPostById);


// add post
router.post('/', addPost);
// update post
router.put('/:id', updatePost);
// delete post
router.delete('/:id', deletePost);

export default router;