const mongoose = require('mongoose');

module.exports = mongoose.model(
  'WorkoutStage',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
    },
  })
);
