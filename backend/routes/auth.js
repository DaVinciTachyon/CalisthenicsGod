const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorisationValidation = require('../validation/auth');
const measurementValidation = require('../validation/measurement');
const User = require('../models/User');
const Measurement = require('../models/Measurement');

router.post('/register', async (req, res) => {
  const { error } = authorisationValidation.register(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const { merror } = measurementValidation.weight({ weight: req.body.weight });
  if (merror) return res.status(400).send({ error: merror.details[0].message });

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({ error: 'Email already exists' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
  });
  const measurements = new Measurement({
    userId: user._id,
  });
  measurements.weight.unshift({
    value: req.body.weight,
  });

  try {
    await user.save();
    await measurements.save();
    res.status(200).send({ user: user._id });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/login', async (req, res) => {
  const { error } = authorisationValidation.login(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ error: 'Email does not exist' });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({ error: 'Invalid Password' });

  const token = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET || 'secret'
  );
  res.header('Authentication', token).send({ Authentication: token });
});

module.exports = router;
