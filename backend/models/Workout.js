const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Workout',
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    workouts: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        stages: [
          {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'WorkoutStage',
              required: true,
            },
            exercises: [
              {
                id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Exercise',
                  required: true,
                },
                sets: [
                  {
                    repetitions: {
                      type: Number,
                      min: 0,
                    },
                    time: {
                      type: Number,
                      min: 0,
                    },
                    distance: {
                      type: Number,
                      min: 0,
                    },
                    weight: {
                      type: Number,
                      min: 0,
                    },
                  },
                ],
                type: {
                  type: String,
                  enum: [
                    'isotonic',
                    'eccentric',
                    'isometric',
                    'distance',
                    'timed',
                  ],
                  required: true,
                },
                rest: {
                  intraset: {
                    type: Number,
                    min: 0,
                  },
                  interset: {
                    type: Number,
                    min: 0,
                    required: true,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  })
);
