const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Exercise',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    abbreviation: {
      type: String,
      trim: true,
      index: {
        partialFilterExpression: {
          abbreviation: { $type: 'string' },
        },
      },
    },
    motionType: {
      transversePlane: {
        type: String,
        enum: ['upper', 'lower'],
      },
      verticality: {
        type: String,
        enum: ['horizontal', 'vertical'],
      },
      frontalPlane: {
        type: String,
        enum: ['push', 'pull'],
      },
      kineticChain: {
        type: String,
        enum: ['closed', 'open'],
      },
      motion: {
        type: String,
        enum: ['isometric', 'isotonic'],
      },
    },
    potentialStages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkoutStage',
      },
    ],
    requirements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    ],
    description: {
      type: String,
    },
  })
);
