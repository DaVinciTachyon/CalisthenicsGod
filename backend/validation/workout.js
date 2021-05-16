const Joi = require('@hapi/joi');

module.exports = {
  stage: (data) =>
    Joi.object({
      name: Joi.string().required(),
      description: Joi.string().allow(''),
      chronologicalRanking: Joi.number().min(0).required(),
    }).validate(data),
  stageEdit: (data) =>
    Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      description: Joi.string().allow(''),
    }).validate(data),
  id: (data) =>
    Joi.object({
      _id: Joi.string().required(),
    }).validate(data),
};
