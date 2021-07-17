const jwt = require('jsonwebtoken');
const authentication = require('../services/authentication');

/**
 * Authenticate JWT
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Next} next 
 */
 module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1];
  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded.user) {
      return res.sendStatus(403);
    }
    req.user = decoded.user;

    next();
  });
};