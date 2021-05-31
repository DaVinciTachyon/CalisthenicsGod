const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Meal',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    ingredients: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true,
        },
        weight: {
          type: Number,
          min: 0.01,
          required: true,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  })
);
