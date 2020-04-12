const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255
	},
	email: {
		type: String,
		required: true,
		unique: true,
		min: 5,
		max: 255
	},
	password: {
		type: String,
		required: true,
		min: 6
	},
	date_joined: {
		type: Date,
		default: Date.now
	},
	groups: []
});

module.exports = mongoose.model('User', userSchema);
