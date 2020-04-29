const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
	brand: {
		type: String,
		required: true,
		min: 3,
		max: 255
	},
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255
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
});

module.exports = mongoose.model('Food', foodSchema);
