const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./validation');
const User = require('../models/User');

router.post('/register', async (req, res) => {
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send({ error: 'Email already exists' });

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});

	try {
		const savedUser = await user.save();
		res.status(200).send({ user: user._id });
	} catch (err) {
		res.status(400).send({ error: err });
	}
});

router.post('/login', async (req, res) => {
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send({ error: error.details[0].message });

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send({ error: 'Email does not exist' });

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send({ error: 'Invalid Password' });

	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send({ 'auth-token': token });
});

module.exports = router;
