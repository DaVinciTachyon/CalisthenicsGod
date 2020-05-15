const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    fat: {
        type: Number,
        default: 0,
        min: 0
    },
    carbohydrate: {
        type: Number,
        default: 0,
        min: 0
    },
    protein: {
        type: Number,
        default: 0,
        min: 0
    },
    ethanol: {
        type: Number,
        default: 0,
        min: 0
    }
});

module.exports = mongoose.model('Ingredients', ingredientSchema);
