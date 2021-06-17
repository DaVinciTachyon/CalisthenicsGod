const router = require('express').Router();
const verify = require('./tokenVerification');
const Measurement = require('../models/Measurement');
const measurementValidation = require('../validation/measurement');

router.use(verify, (req, res, next) => {
  next();
});

router
  .route('/')
  .post(async (req, res) => {
    const { error } = measurementValidation.all(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const measurements = await Measurement.findOne({ userId: req.user._id });

    const response = {};
    Object.keys(req.body).forEach((name) => {
      if (Array.isArray(measurements[name])) {
        measurements[name].unshift({
          value: req.body[name],
        });
        response[name] = measurements[name][0];
      }
    });

    try {
      await measurements.save();
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  })
  .get(async (req, res) => {
    const measurements = await Measurement.findOne({ userId: req.user._id });
    const response = {};

    Object.keys(measurements._doc).forEach((name) =>
      Array.isArray(measurements[name]) && measurements[name].length > 0
        ? (response[name] = measurements[name][0])
        : null
    );

    res.send(response);
  });

router
  .route('/:name')
  .post(async (req, res) => {
    const { error } = measurementValidation.all(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const measurements = await Measurement.findOne({ userId: req.user._id });
    if (!measurements[req.params.name])
      return res.status(400).send({ error: 'Parameter not recognised' });
    if (!req.body[req.params.name])
      return res.status(400).send({ error: 'Field not available' });

    measurements[req.params.name].unshift({
      value: req.body[req.params.name],
    });

    try {
      await measurements.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  })
  .get(async (req, res) => {
    const measurements = await Measurement.findOne({ userId: req.user._id });
    if (measurements[req.params.name])
      res.send({ [req.params.name]: measurements[req.params.name][0] });
    else res.status(400).send({ error: 'Parameter not recognised' });
  });

router.get('/:name/history', async (req, res) => {
  const measurements = await Measurement.findOne({ userId: req.user._id });
  if (measurements[req.params.name])
    res.send({ [req.params.name]: measurements[req.params.name] });
  else res.status(400).send({ error: 'Parameter not recognised' });
});

module.exports = router;
