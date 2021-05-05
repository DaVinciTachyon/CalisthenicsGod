const mongoose = require('mongoose');

module.exports = mongoose.model('WorkoutStage', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    chronologicalRanking: {
        type: Number,
        unique: true,
        required: true
    },
    description: {
        type: String
    }
}));