const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authentication');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET || 'secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid Token' });
  }
};
