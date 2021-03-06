const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Ingredient',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    macronutrients: {
      fat: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      carbohydrate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      protein: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      ethanol: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  })
);
