const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
	userId: {
		type: String,
		unique: true,
		required: true
	},
	ingredients: [
		{
			name: {
				type: String,
				unique: true,
				required: true
			},
			fat: {
				type: Number,
				default: 0,
				min: 0,
				max: 100
			},
			carbohydrate: {
				type: Number,
				default: 0,
				min: 0,
				max: 100
			},
			protein: {
				type: Number,
				default: 0,
				min: 0,
				max: 100
			},
			ethanol: {
				type: Number,
				default: 0,
				min: 0,
				max: 100
			},
			isAvailable: {
				type: Boolean,
				default: true
			}
		}
	]
});

module.exports = mongoose.model('Ingredients', ingredientSchema);
