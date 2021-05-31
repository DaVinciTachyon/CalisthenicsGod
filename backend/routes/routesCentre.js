const router = require('express').Router();
const authRoute = require('./auth');
const nutrientRoute = require('./nutrition');
const measurementRoute = require('./measurement');
const userRoute = require('./user');
const exerciseRoute = require('./exercises');
const workoutRoute = require('./workout');

router.use(function (req, res, next) {
  next();
});

router.use('/auth', authRoute);
router.use('/nutrition', nutrientRoute);
router.use('/measurement', measurementRoute);
router.use('/user', userRoute);
router.use('/exercise', exerciseRoute);
router.use('/workout', workoutRoute);

module.exports = router;
