const mongoose = require('mongoose');

const nutrientSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
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
	history: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			meals: [
				{
					ingredients: [
						{
							ingredientId: {
								type: String,
								required: true
							},
							weight: {
								type: Number,
								min: 0.01,
								required: true
							}
						}
					]
				}
			]
		}
	]
});

module.exports = mongoose.model('Nutrients', nutrientSchema);
