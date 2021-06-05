const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Exercise',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    abbreviation: {
      type: String,
      trim: true,
      uppercase: true,
      index: {
        partialFilterExpression: {
          abbreviation: { $type: 'string' },
        },
      },
    },
    motionType: {
      transversePlane: {
        type: String,
        enum: ['upper', 'lower', 'core'],
      },
      verticality: {
        type: String,
        enum: ['horizontal', 'vertical'],
      },
      frontalPlane: {
        type: String,
        enum: ['push', 'pull', 'rotational'],
      },
      kineticChain: {
        type: String,
        enum: ['closed', 'open'],
      },
      motion: {
        type: String,
        enum: ['isometric', 'isotonic', 'distance', 'timed'],
        required: true,
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
    isAvailable: {
      type: Boolean,
      default: true,
    },
  })
);
