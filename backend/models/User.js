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
			value: {
				type: Number,
				required: true
			}
		}
	],
	height: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			value: {
				type: Number,
				required: true
			}
		}
	],
	waist: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			value: {
				type: Number,
				required: true
			}
		}
	],
	hips: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			value: {
				type: Number,
				required: true
			}
		}
	],
	rightBicep: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			value: {
				type: Number,
				required: true
			}
		}
	],
	leftBicep: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			value: {
				type: Number,
				required: true
			}
		}
	],
	rightForearm: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			value: {
				type: Number,
				required: true
			}
		}
	],
	leftForearm: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			value: {
				type: Number,
				required: true
			}
		}
	],
	shoulders: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			value: {
				type: Number,
				required: true
			}
		}
	],
	chest: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			value: {
				type: Number,
				required: true
			}
		}
	],
	neck: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			value: {
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
