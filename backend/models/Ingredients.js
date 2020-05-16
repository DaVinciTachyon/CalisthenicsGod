const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true
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
	}
});

module.exports = mongoose.model('Ingredients', ingredientSchema);
