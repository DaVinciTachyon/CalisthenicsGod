const router = require('express').Router();
const stageRoute = require('./stage');
const verify = require('./tokenVerification');
const Workout = require('../models/Workout');
const WorkoutStage = require('../models/WorkoutStage');
const Exercise = require('../models/Exercise');
const workoutValidation = require('../validation/workout');

router.use(verify, async (req, res, next) => {
  let workout = await Workout.findOne({ userId: req.user._id });

  if (!workout) {
    workout = new Workout({ userId: req.user._id, workouts: [] });

    try {
      await workout.save();
      return next();
    } catch (err) {
      console.error(err);
    }
  } else next();
});
router.use('/stage', stageRoute);

router
  .route('/')
  .get(async (req, res) => {
    const workout = await Workout.findOne({ userId: req.user._id });

    res.send({ workouts: workout.workouts });
  })
  .post(async (req, res) => {
    const { error } = workoutValidation.workout(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const workout = await Workout.findOne({ userId: req.user._id });
    workout.workouts.unshift(req.body);

    try {
      await workout.save();
      res.status(200).send({ workout: workout.workouts[0] });
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });

module.exports = router;
