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
                ingredientId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Ingredients',
                  required: true,
                },
                weight: {
                  type: Number,
                  min: 0.01,
                  required: true,
                },
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
            ],
          },
        ],
      },
    ],
  })
);
