const router = require('express').Router();
const verify = require('./tokenVerification');
const User = require('../models/User');
const authValidation = require('../validation/auth');

router.use(verify, (req, res, next) => {
  next();
});

router
  .route('/')
  .get(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    res.send({
      name: user.name,
      email: user.email,
      dateJoined: user.dateJoined,
      birthDate: user.birthDate,
      gender: user.gender,
    });
  })
  .post(async (req, res) => {
    const { error } = authValidation.userInfo(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const userEmail = await User.findOne({
      email: req.body.email,
    });
    if (userEmail && userEmail._id !== req.user._id)
      return res.status(400).send({ error: 'Email already in use.' });

    const user = await User.findById(req.user._id);
    Object.keys(req.body).forEach((name) => (user[name] = req.body[name]));

    try {
      await user.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });

module.exports = router;
