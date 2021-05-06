const Joi = require('@hapi/joi');

module.exports = {
  exercise: (data) =>
    Joi.object({
      name: Joi.string().required(),
      abbreviation: Joi.string(),
      motionType: {
        transversePlane: Joi.string().valid('upper', 'lower'),
        verticality: Joi.string().valid('horizontal', 'vertical'),
        frontalPlane: Joi.string().valid('push', 'pull'),
        kineticChain: Joi.string().valid('closed', 'open'),
        motion: Joi.string().valid('isometric', 'isotonic'),
      },
      potentialCategories: Joi.array().items(Joi.string()),
      requirements: Joi.array().items(Joi.string()),
      description: Joi.string(),
    }).validate(data),
};
