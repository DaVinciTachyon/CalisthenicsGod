const mongoose = require('mongoose');

module.exports = mongoose.model('WorkoutStageOrder', new mongoose.Schema({
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkoutStage'
    }]
}));