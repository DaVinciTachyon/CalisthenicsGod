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
	maintenanceCalories: {
		type: Number
	},
	weight: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			weight: {
				type: Number,
				required: true
			}
		}
	],
	food: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			meals: [
				{
					name: {
						type: String,
						required: true
					},
					fat: {
						type: Number,
						default: 0,
						required: true
					},
					carbohydrate: {
						type: Number,
						default: 0,
						required: true
					},
					protein: {
						type: Number,
						default: 0,
						required: true
					},
					ethanol: {
						type: Number,
						default: 0,
						required: true
					}
				}
			]
		}
	],
	groups: []
});

module.exports = mongoose.model('User', userSchema);
