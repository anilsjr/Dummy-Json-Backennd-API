import express from "express";

import { allRecipes, getAllTags, searchRecipeByName, searchRecipeById, searchRecipeByMealType, searchRecipeByTagName } from "../controller/recipes.controller.js";

const router = express.Router();

// get all the recipes with limit skip sort
router.get('/',  allRecipes);
// Search recipes by query
router.get(/^\/search$/i, searchRecipeByName);
// get recipes by meal-type
router.get('/meal-type/:mealType', searchRecipeByMealType);
// Get all unique tags from recipes
router.get('/tags', getAllTags);
//get recipes by tag name
router.get('/tag/:tagName', searchRecipeByTagName);
// Get a single recipe by ID
router.get('/:id', searchRecipeById);


// add recipe
// update recipe
// delete recipe

export default router;