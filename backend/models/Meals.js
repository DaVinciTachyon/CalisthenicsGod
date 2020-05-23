const mongoose = require('mongoose');

const mealsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
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
	],
	userId: {
		type: String
	}
});

module.exports = mongoose.model('Meals', mealsSchema);
