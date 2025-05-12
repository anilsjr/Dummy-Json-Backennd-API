import axios from 'axios';
import Recipies from '../models/recipes.js';
import { sequelize } from '../config/dbConfig.js';

async function importRecipies() {
  try {
    const response = await axios.get('https://dummyjson.com/recipes');
    const recipies = response.data.recipes || response.data;

    for (const recipe of recipies) {
      await Recipies.create({
        id: recipe.id,
        name: recipe.name,
        ingredients: JSON.stringify(recipe.ingredients),
        instructions: JSON.stringify(recipe.instructions),
        prep_time_minutes: recipe.prepTimeMinutes || null,
        cook_time_minutes: recipe.cookTimeMinutes || null,
        servings: recipe.servings || null,
        cuisine: recipe.cuisine || null,
        calories_per_serving: recipe.caloriesPerServing || null,
        tags: JSON.stringify(recipe.tags),
        user_id: recipe.userId || null,
        image: recipe.image || null
      });
    }
    console.log('Recipies import complete!');
  } catch (error) {
    console.error('Error importing recipies:', error.message);
  } finally {
    await sequelize.close();
  }
}

importRecipies();
