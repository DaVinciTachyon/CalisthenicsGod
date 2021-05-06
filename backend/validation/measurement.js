const Joi = require('@hapi/joi');

module.exports = {
  all: (data) =>
    Joi.object({
      weight: Joi.number().min(0.01),
      height: Joi.number().min(0.001),
      waist: Joi.number().min(0.001),
      hips: Joi.number().min(0.001),
      rightBicep: Joi.number().min(0.001),
      leftBicep: Joi.number().min(0.001),
      rightForearm: Joi.number().min(0.001),
      leftForearm: Joi.number().min(0.001),
      shoulders: Joi.number().min(0.001),
      chest: Joi.number().min(0.001),
      neck: Joi.number().min(0.001),
    }).validate(data),
  weight: (data) =>
    Joi.object({
      weight: Joi.number().min(0.01).required(),
    }).validate(data),
};
