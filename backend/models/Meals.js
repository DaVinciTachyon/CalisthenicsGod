const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Meals',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Ingredients',
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
