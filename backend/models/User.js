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
		type: Number,
		default: 0,
		min: 0
	},
	calorieOffset: {
		type: Number,
		default: 0
	},
	proteinAmount: {
		type: Number,
		default: 1.9,
		min: 0
	},
	fatPartition: {
		type: Number,
		default: 0.3,
		min: 0,
		max: 1
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
						default: 0
					},
					carbohydrate: {
						type: Number,
						default: 0
					},
					protein: {
						type: Number,
						default: 0
					},
					ethanol: {
						type: Number,
						default: 0
					}
				}
			]
		}
	],
	groups: []
});

module.exports = mongoose.model('User', userSchema);
