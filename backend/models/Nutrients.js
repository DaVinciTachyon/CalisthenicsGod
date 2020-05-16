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
								type: String
							},
							weight: {
								type: Number,
								min: 0.01
							},
							name: {
								type: String
							},
							fat: {
								type: Number,
								min: 0
							},
							carbohydrate: {
								type: Number,
								min: 0
							},
							protein: {
								type: Number,
								min: 0
							},
							ethanol: {
								type: Number,
								min: 0
							}
						}
					]
				}
			]
		}
	]
});

module.exports = mongoose.model('Nutrients', nutrientSchema);
