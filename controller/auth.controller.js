import Users from '../models/users.model.js';
import jwt from 'jsonwebtoken';

// POST /api/auth/login
export const login = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await Users.findOne({
      where: email ? { email } : { username },
    });
    if (!user) {
      return res.status(500).json({ status: 500, message: 'Invalid credentials' });
    }
    const isMatch = (password === user.password);
    if (!isMatch) {
      return res.status(500).json({ status: 500, message: 'Invalid credentials' });
    }
    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.status(201).json({
      status: 201,
      message: 'Login successful',
      token: accessToken,
      user: {
        id: user.id,
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
      },
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'Invalid credentials' });
  }
};

// GET /auth/me
export const getMe = async (req, res) => {
  try {
    console.log('in getme');
    
    const user = await Users.findByPk(req.user.id);
    if (!user) {
      return res.status(401).json({ status: 401, message: 'Invalid token', 'userDetail ': user });
    }
    return res.status(201).json({
      status: 201,
      message: 'User fetched successfully',
      user: {
        id: user.id,
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({ status: 401, message: 'Invalid token' ,'a':'fas', 'error': err});
  }
};
