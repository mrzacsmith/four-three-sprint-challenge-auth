/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'the secret';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'we wants token!' });
    return;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'we wants VALID token!' });
    } else {
      req.token = decoded;
      next();
    }
  });
};
