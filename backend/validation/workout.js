const Joi = require('@hapi/joi');

const set = {
  repetitions: Joi.number().min(0),
  time: Joi.number().min(0),
  distance: Joi.number().min(0),
  weight: Joi.number().min(0),
};

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
  workout: (data) =>
    Joi.object({
      stages: Joi.array().items({
        id: Joi.string().required(),
        exercises: Joi.array().items({
          id: Joi.string().required(),
          sets: Joi.array().items(set),
          type: Joi.string()
            .valid('isotonic', 'eccentric', 'isometric', 'distance', 'timed')
            .required(),
          rest: Joi.object({
            intraset: Joi.number().min(0),
            interset: Joi.number().min(0).required(),
          }),
        }),
      }),
    }).validate(data),
};
