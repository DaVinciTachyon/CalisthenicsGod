const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Nutrients',
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    caloriesPerKg: {
      type: Number,
      default: 30,
      min: 0,
    },
    calorieOffset: {
      type: Number,
      default: 0,
    },
    proteinGramsPerKg: {
      type: Number,
      default: 2,
      min: 0,
    },
    fatCalorieProportion: {
      type: Number,
      default: 0.2,
      min: 0,
      max: 1,
    },
    history: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        meals: [
          {
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
          },
        ],
      },
    ],
  })
);
