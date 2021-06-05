const Joi = require('@hapi/joi');

const transversePlane = Joi.string().valid('upper', 'lower', 'core');

const verticality = Joi.string().valid('horizontal', 'vertical');

const frontalPlane = Joi.string().valid('push', 'pull', 'rotational');

const kineticChain = Joi.string().valid('closed', 'open');

const motion = Joi.string().valid('isometric', 'isotonic', 'distance', 'timed');

module.exports = {
  exercise: (data) =>
    Joi.object({
      name: Joi.string().required(),
      abbreviation: Joi.string().allow(''),
      motionType: {
        transversePlane,
        verticality,
        frontalPlane,
        kineticChain,
        motion: motion.required(),
      },
      potentialStages: Joi.array().items(Joi.string()),
      requirements: Joi.array().items(Joi.string()),
      description: Joi.string().allow(''),
    }).validate(data),
  id: (data) =>
    Joi.object({
      _id: Joi.string().required(),
    }).validate(data),
  editExercise: (data) =>
    Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      abbreviation: Joi.string().allow(''),
      motionType: Joi.object({
        transversePlane,
        verticality,
        frontalPlane,
        kineticChain,
        motion: motion.required(),
      }),
      potentialStages: Joi.array().items(Joi.string()),
      requirements: Joi.array().items(Joi.string()),
      description: Joi.string().allow(''),
    }).validate(data),
};
