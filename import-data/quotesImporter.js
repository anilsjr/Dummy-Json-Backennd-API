import axios from 'axios';
import Quotes from '../models/quotes.model.js';
import { sequelize } from '../config/dbConfig.js';

async function importQuotes() {
  try {
    const response = await axios.get('https://dummyjson.com/quotes?limit=10000');
    const quotes = response.data.quotes || response.data;

    for (const quote of quotes) {
      await Quotes.create({
        id: quote.id,
        quote: quote.quote,
        author: quote.author
      });
    }
    console.log('Quotes import complete!');
  } catch (error) {
    console.error('Error importing quotes:', error);
  } finally {
    await sequelize.close();
  }
}

importQuotes();
