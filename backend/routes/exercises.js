const router = require('express').Router();
const Exercise = require('../models/Exercise');
const exerciseValidation = require('../validation/exercise');
const verify = require('./verifyToken');

router.use(verify, (req, res, next) => {
	next();
});

router.get('/', async (req, res) => {
  const exercises = await Exercise.find();

	res.send({ exercises: exercises });
});

router.post('/add', async (req, res) => {
  const { error } = exerciseValidation.exercise(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const exerciseName = await Exercise.findOne({
		name: req.body.name
	});
	if (exerciseName) return res.status(400).send({ error: 'Name already in use.' });
  if(req.body.abbreviation !== "") {
    const exerciseAbbreviation = await Exercise.findOne({
      abbreviation: req.body.abbreviation
    });
    if (exerciseAbbreviation) return res.status(400).send({ error: 'Abbreviation already in use.' });
  }

	const exercise = new Exercise({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    motionType: {
      transversePlane: req.body.motionType.transversePlane,
      verticality: req.body.motionType.verticality,
      frontalPlane: req.body.motionType.frontalPlane,
      kineticChain: req.body.motionType.kineticChain,
      motion: req.body.motionType.motion
    },
    potentialCategories: req.body.potentialCategories,
    requirements: req.body.requirements,
    description: req.body.description
	});

	try {
		await exercise.save();
		res.status(200).send(exercise);
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

//TODO router.post('/edit', async (req, res) => {});

module.exports = router;