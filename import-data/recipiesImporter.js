import axios from 'axios';
import Recipies from '../models/recipes.js';
import { sequelize } from '../config/dbConfig.js';

async function importRecipies() {
  try {
    const response = await axios.get('https://dummyjson.com/recipes?limit=10000&skip=0');
    const recipies = response.data.recipes || response.data;

    for (const recipe of recipies) {
      const result = await Recipies.create({
        id: recipe.id,
        name: recipe.name,
        ingredients: recipe.ingredients, // JSON
        instructions: recipe.instructions, // JSON
        prep_time_minutes: recipe.prepTimeMinutes || null,
        cook_time_minutes: recipe.cookTimeMinutes || null,
        servings: recipe.servings || null,
        difficulty: recipe.difficulty || null,
        cuisine: recipe.cuisine || null,
        calories_per_serving: recipe.caloriesPerServing || null,
        tags: recipe.tags, // JSON
        user_id: recipe.userId || null,
        image: recipe.image || null,
        rating: recipe.rating || null,
        review_count: recipe.reviewCount || null,
        meal_type: recipe.mealType || null
      });
      console.log('result', result);
    }
    console.log('Recipies import complete!');
  } catch (error) {
    console.error('Error importing recipies:', error.message);
  } finally {
    await sequelize.close();
  }
}

importRecipies();
