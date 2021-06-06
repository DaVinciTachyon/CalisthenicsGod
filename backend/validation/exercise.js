const Joi = require('@hapi/joi');

const transversePlane = Joi.string().valid('upper', 'lower', 'core');

const verticality = Joi.string().valid('horizontal', 'vertical');

const frontalPlane = Joi.string().valid(
  'push',
  'pull',
  'rotational',
  'lateral'
);

const kineticChain = Joi.string().valid('closed', 'open');

const motion = Joi.string().valid('isometric', 'isotonic', 'distance', 'timed');

const sagittalPlane = Joi.string().valid('bilateral', 'unilateral');

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
        sagittalPlane,
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
        sagittalPlane,
        motion: motion.required(),
      }),
      potentialStages: Joi.array().items(Joi.string()), //.min(1),
      requirements: Joi.array().items(Joi.string()),
      description: Joi.string().allow(''),
    }).validate(data),
};
