import axios from 'axios';
import Comments from '../models/comments.js';
import { sequelize } from '../config/dbConfig.js';

async function importComments() {
  try {
    const response = await axios.get('https://dummyjson.com/comments');
    const comments = response.data.comments || response.data;

    for (const comment of comments) {
      await Comments.create({
        id: comment.id,
        body: comment.body,
        post_id: comment.postId,
        user_id: comment.user && comment.user.id ? comment.user.id : null
      });
    }
    console.log('Comments import complete!');
  } catch (error) {
    console.error('Error importing comments:', error);
  } finally {
    await sequelize.close();
  }
}

importComments();
