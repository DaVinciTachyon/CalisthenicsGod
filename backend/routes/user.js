const router = require('express').Router();
const verify = require('./verifyToken');
const Nutrients = require('../models/Nutrients');
const Measurements = require('../models/Measurements');
const User = require('../models/User');
const { getMaintenanceCalories } = require('./nutrientUtil');

router.use(verify, (req, res, next) => {
  next();
});

router.get('/', async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const nutrients = await Nutrients.findOne({ userId: req.user._id });
  const measurements = await Measurements.findOne({ userId: req.user._id });
  res.send({
    name: user.name,
    email: user.email,
    dateJoined: user.dateJoined,
    birthDate: user.birthDate,
    gender: user.gender,
    weight: measurements.weight[0].value,
    caloriesPerKg: nutrients.caloriesPerKg,
    calorieOffset: nutrients.calorieOffset,
    proteinGramsPerKg: nutrients.proteinGramsPerKg,
    fatCalorieProportion: nutrients.fatCalorieProportion,
  });
});

module.exports = router;
