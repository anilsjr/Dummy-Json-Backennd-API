import axios from 'axios';
import Posts from '../models/posts.model.js';
import { sequelize } from '../config/dbConfig.js';

async function importPosts() {
  try {
    const response = await axios.get('https://dummyjson.com/posts?limit=10000&skip=0');
    const posts = response.data.posts || response.data;

    for (const post of posts) {
      await Posts.create({
        id: post.id,
        title: post.title,
        tags: post.tags || [],
        reactions: post.reactions || {},
        views: post.views || 0,
        user_id: post.userId,
        body: post.body
      });
    }
    console.log('Post import complete!');
  } catch (error) {
    console.error('Error importing posts:', error.message);
  } finally {
    await sequelize.close();
  }
}

importPosts();
