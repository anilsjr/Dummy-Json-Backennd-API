import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    console.log('middleware')
  const authHeader = req.headers['authorization'];
  const token = ( authHeader && authHeader.split(' ')[1] );
  if (!token) {
    console.log('midd');
    console.log('JWT TOKEN : ', token, ' ', req.cookies.jwt, '');
    return res.status(401).json({ status: 401, message: 'Invalid token', token });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ status: 401, message: 'Invalid token' , 'token': token});
    }
    req.user = user;
    next();
  });
};
