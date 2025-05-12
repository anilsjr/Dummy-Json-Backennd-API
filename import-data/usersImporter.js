import axios from 'axios';
import Users from '../models/users.js';
import { sequelize } from '../config/dbConfig.js';

async function importUsers() {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    const users = response.data.users || response.data;

    for (const user of users) {
      await Users.create({
        first_name: user.firstName || user.first_name,
        last_name: user.lastName || user.last_name,
        middle_name: user.middleName || user.middle_name || null,
        phone: user.phone || null,
        username: user.username,
        email: user.email,
        password: user.password || '',
        image: user.image || null,
        blood_group: user.bloodGroup || null,
        height: user.height || null,
        weight: user.weight || null,
        eye_color: user.eyeColor || null,
        hair_id: null,
        address_id: null,
        dob: user.birthDate || null,
        access_token: null,
        refresh_token: null
      });
    }
    console.log('User import complete!');
  } catch (error) {
    console.error('Error importing users:', error);
  } finally {
    await sequelize.close();
  }
}

importUsers();
