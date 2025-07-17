import axios from 'axios';
import Users from '../models/users.model.js';
import { sequelize } from '../config/dbConfig.js';

async function importUsers() {
  try {
    const response = await axios.get('https://dummyjson.com/users?limit=30');
    const users = response.data.users || response.data;

    for (const user of users) {
      await Users.create({
        id: user.id,
        first_name: user.firstName || user.first_name,
        last_name: user.lastName || user.last_name,
        middle_name: user.maidenName,
        phone: user.phone || null,
        gender: user.gender || null,
        username: user.username,
        email: user.email,
        password: user.password || '',
        image: user.image || null,
        blood_group: user.bloodGroup || null,
        height: user.height || null,
        weight: user.weight || null,
        eye_color: user.eyeColor || null,
        // hair_id: 1 || null,
        // address_id: 1|| null,
        dob: user.birthDate || null,
        birth_date: user.birthDate || null, // set birth_date same as dob
        access_token: null,
        refresh_token: null,
        // role_id: 1,
        ip: user.ip,
        age: undefined, // removed from model, kept for clarity
        hair: user.hair,
        address: user.address,
        bank: user.bank,
        mac_address: user.macAddress || null,
        university: user.university || null,
        company: user.company || null,
        ein: user.ein || null,
        user_agent: user.userAgent || null,
        ssn: user.ssn || null,
        crypto: user.crypto || null,
        role: user.role || null
      });
    }
    console.log('User import complete!');
  } catch (error) {
    console.error('Error importing users:', error.message);
  } finally {
    await sequelize.close();
  }
}

importUsers();
