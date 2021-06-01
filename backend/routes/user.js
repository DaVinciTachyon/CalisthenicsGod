const router = require('express').Router();
const verify = require('./tokenVerification');
const User = require('../models/User');

router.use(verify, (req, res, next) => {
  next();
});

router.get('/', async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  res.send({
    name: user.name,
    email: user.email,
    dateJoined: user.dateJoined,
    birthDate: user.birthDate,
    gender: user.gender,
  });
});

module.exports = router;
