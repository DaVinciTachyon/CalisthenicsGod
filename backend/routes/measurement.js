const router = require('express').Router();
const verify = require('./tokenVerification');
const Measurements = require('../models/Measurements');
const measurementValidation = require('../validation/measurement');

router.use(verify, (req, res, next) => {
  next();
});

router.post('/weight', async (req, res) => {
  const { error } = measurementValidation.weight(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const measurements = await Measurements.findOne({ userId: req.user._id });
  measurements.weight.unshift({
    value: req.body.weight,
  });
  try {
    await measurements.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get('/weight', async (req, res) => {
  const measurements = await Measurements.findOne({ userId: req.user._id });
  if (measurements.weight.length > 0)
    res.send({ weight: measurements.weight[0].value });
  else res.status(404);
});

router.get('/weight/history', async (req, res) => {
  const measurements = await Measurements.findOne({ userId: req.user._id });
  if (measurements.weight.length > 0) res.send({ weight: measurements.weight });
  else res.status(404);
});

router.post('/', async (req, res) => {
  const { error } = measurementValidation.all(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const measurements = await Measurements.findOne({ userId: req.user._id });
  if (req.body.weight) {
    measurements.weight.unshift({
      value: req.body.weight,
    });
  }
  if (req.body.height) {
    measurements.height.unshift({
      value: req.body.height,
    });
  }
  if (req.body.waist) {
    measurements.waist.unshift({
      value: req.body.waist,
    });
  }
  if (req.body.hips) {
    measurements.hips.unshift({
      value: req.body.hips,
    });
  }
  if (req.body.rightBicep) {
    measurements.rightBicep.unshift({
      value: req.body.rightBicep,
    });
  }
  if (req.body.leftBicep) {
    measurements.leftBicep.unshift({
      value: req.body.leftBicep,
    });
  }
  if (req.body.rightForearm) {
    measurements.rightForearm.unshift({
      value: req.body.rightForearm,
    });
  }
  if (req.body.leftForearm) {
    measurements.leftForearm.unshift({
      value: req.body.leftForearm,
    });
  }
  if (req.body.shoulders) {
    measurements.shoulders.unshift({
      value: req.body.shoulders,
    });
  }
  if (req.body.chest) {
    measurements.chest.unshift({
      value: req.body.chest,
    });
  }
  if (req.body.neck) {
    measurements.neck.unshift({
      value: req.body.neck,
    });
  }
  try {
    await measurements.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get('/', async (req, res) => {
  const measurements = await Measurements.findOne({ userId: req.user._id });
  if (measurements.weight.length > 0)
    res.send({
      weight: measurements.weight[0].value,
      height: measurements.height.length > 0 ? measurements.height[0].value : 0,
      waist: measurements.waist.length > 0 ? measurements.waist[0].value : 0,
      hips: measurements.hips.length > 0 ? measurements.hips[0].value : 0,
      rightBicep:
        measurements.rightBicep.length > 0
          ? measurements.rightBicep[0].value
          : 0,
      leftBicep:
        measurements.leftBicep.length > 0 ? measurements.leftBicep[0].value : 0,
      rightForearm:
        measurements.leftForearm.length > 0
          ? measurements.leftForearm[0].value
          : 0,
      leftForearm:
        measurements.rightForearm.length > 0
          ? measurements.rightForearm[0].value
          : 0,
      shoulders:
        measurements.shoulders.length > 0 ? measurements.shoulders[0].value : 0,
      chest: measurements.chest.length > 0 ? measurements.chest[0].value : 0,
      neck: measurements.neck.length > 0 ? measurements.neck[0].value : 0,
    });
  else res.sendStatus(404);
});

module.exports = router;
