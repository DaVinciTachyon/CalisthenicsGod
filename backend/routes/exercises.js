const router = require('express').Router();
const Exercise = require('../models/Exercise');
const exerciseValidation = require('../validation/exercise');
const verify = require('./tokenVerification');

router.use(verify, (req, res, next) => {
  next();
});

router.get('/', async (req, res) => {
  const exercises = await Exercise.find();

  res.send({ exercises: exercises });
});

router.post('/', async (req, res) => {
  //FIXME when adding requirements only add highest level, no need to add two things where one is a sub requirement of the other
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

  const exercise = new Exercise({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    motionType: {
      transversePlane: req.body.motionType.transversePlane,
      verticality: req.body.motionType.verticality,
      frontalPlane: req.body.motionType.frontalPlane,
      kineticChain: req.body.motionType.kineticChain,
      motion: req.body.motionType.motion,
    },
    potentialStages: req.body.potentialStages,
    requirements: req.body.requirements,
    description: req.body.description,
  });

  try {
    await exercise.save();
    res.status(200).send(exercise);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/remove', async (req, res) => {
  const { error } = exerciseValidation.id(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const exercise = await Exercise.findByIdAndDelete(req.body._id);
  if (!exercise)
    return res.status(400).send({ error: 'Exercise did not exist.' });

  res.sendStatus(200);
});

router.post('/edit', async (req, res) => {
  //FIXME when adding requirements only add highest level, no need to add two things where one is a sub requirement of the other
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
  exercise.name = req.body.name;
  exercise.abbreviation = req.body.abbreviation;
  exercise.motionType = req.body.motionType;
  exercise.potentialStages = req.body.potentialStages;
  exercise.requirements = req.body.requirements;
  exercise.description = req.body.description;

  try {
    await exercise.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
