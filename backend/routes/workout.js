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
    const workouts = await Workout.findOne({ userId: req.user._id });

    const fullWorkouts = [];
    for (const workout of workouts.workouts) {
      const stages = [];
      for (const stage of workout.stages) {
        const fullStage = await WorkoutStage.findOne({ _id: stage.id });
        const exercises = [];
        for (const exercise of stage.exercises) {
          const fullExercise = await Exercise.findOne({ _id: exercise.id });
          exercises.push({
            _id: exercise._id,
            id: exercise.id,
            name: fullExercise.name,
            sets: exercise.sets,
            variation: exercise.variation,
            rest: exercise.rest,
          });
        }
        stages.push({
          _id: stage._id,
          id: stage.id,
          name: fullStage.name,
          exercises,
        });
      }
      fullWorkouts.push({ date: workout.date, stages });
    }

    res.send({ workouts: fullWorkouts });
  })
  .post(async (req, res) => {
    const { error } = workoutValidation.workout(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const workout = await Workout.findOne({ userId: req.user._id });
    workout.workouts.unshift(req.body);

    try {
      await workout.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });

module.exports = router;
