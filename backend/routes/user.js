const router = require('express').Router();
const verify = require('./verifyToken');
const Nutrients = require('../models/Nutrients');
const User = require('../models/User');

router.use(verify, (req, res, next) => {
  next();
});

router.get('/', async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const nutrients = await Nutrients.findOne({ userId: req.user._id });
  res.send({
    name: user.name,
    email: user.email,
    dateJoined: user.dateJoined,
    birthDate: user.birthDate,
    gender: user.gender,
    maintenanceCalories: nutrients.maintenanceCalories,
    calorieOffset: nutrients.calorieOffset,
    proteinAmount: nutrients.proteinAmount,
    fatPartition: nutrients.fatPartition,
  });
});

module.exports = router;
