const router = require('express').Router();
const Exercise = require('../models/Exercise');
const exerciseValidation = require('../validation/exercise');
const verify = require('./tokenVerification');

router.use(verify, (req, res, next) => {
  next();
});

router
  .route('/')
  .get(async (req, res) => {
    const exercises = await Exercise.find();

    res.send({ exercises });
  })
  .post(async (req, res) => {
    const { error } = exerciseValidation.exercise(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const exerciseName = await Exercise.findOne({
      name: req.body.name,
    });
    if (exerciseName)
      return res.status(400).send({ error: 'Name already in use.' });
    if (req.body.abbreviation !== '') {
      const exerciseAbbreviation = await Exercise.findOne({
        abbreviation: req.body.abbreviation,
      });
      if (exerciseAbbreviation)
        return res.status(400).send({ error: 'Abbreviation already in use.' });
    }

    const exercise = new Exercise();
    Object.keys(req.body).forEach((name) => (exercise[name] = req.body[name]));

    try {
      await exercise.save();
      res.status(200).send(exercise);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  })
  .delete(async (req, res) => {
    const { error } = exerciseValidation.id(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const exercise = await Exercise.findById(req.body._id);
    exercise.isAvailable = false;

    try {
      await exercise.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  })
  .patch(async (req, res) => {
    const { error } = exerciseValidation.editExercise(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const exerciseName = await Exercise.findOne({
      _id: { $ne: req.body._id },
      name: req.body.name,
    });
    if (exerciseName)
      return res.status(400).send({ error: 'Name already in use.' });
    if (req.body.abbreviation !== '') {
      const exerciseAbbreviation = await Exercise.findOne({
        _id: { $ne: req.body._id },
        abbreviation: req.body.abbreviation,
      });
      if (exerciseAbbreviation)
        return res.status(400).send({ error: 'Abbreviation already in use.' });
    }

    const exercise = await Exercise.findById(req.body._id);
    Object.keys(req.body).forEach((name) => (exercise[name] = req.body[name]));

    try {
      await exercise.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });

module.exports = router;
