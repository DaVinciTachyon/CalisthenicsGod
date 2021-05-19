const Joi = require('@hapi/joi');

module.exports = {
  exercise: (data) =>
    Joi.object({
      name: Joi.string().required(),
      abbreviation: Joi.string().allow(''),
      motionType: {
        transversePlane: Joi.string().valid('upper', 'lower'),
        verticality: Joi.string().valid('horizontal', 'vertical'),
        frontalPlane: Joi.string().valid('push', 'pull'),
        kineticChain: Joi.string().valid('closed', 'open'),
        motion: Joi.string()
          .valid('isometric', 'isotonic', 'distance')
          .required(),
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
        transversePlane: Joi.string().valid('upper', 'lower'),
        verticality: Joi.string().valid('horizontal', 'vertical'),
        frontalPlane: Joi.string().valid('push', 'pull'),
        kineticChain: Joi.string().valid('closed', 'open'),
        motion: Joi.string().valid('isometric', 'isotonic'),
      }),
      potentialStages: Joi.array().items(Joi.string()),
      requirements: Joi.array().items(Joi.string()),
      description: Joi.string().allow(''),
    }).validate(data),
};
