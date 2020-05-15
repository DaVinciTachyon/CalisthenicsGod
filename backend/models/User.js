const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		first: {
			type: String,
			required: true,
			min: 3,
			max: 255
		},
		middle: {
			type: String,
			min: 3,
			max: 255
		},
		last: {
			type: String,
			required: true,
			min: 3,
			max: 255
		}
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
	dateJoined: {
		type: Date,
		default: Date.now
	},
	birthDate: {
		type: Date
	},
	gender: {
		type: String,
		enum: [
			'male',
			'female'
		]
	},
});

module.exports = mongoose.model('User', userSchema);
