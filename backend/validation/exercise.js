const Joi = require('@hapi/joi')

const componentExercises = Joi.array().items(Joi.string())

const transversePlane = Joi.string().valid('upper', 'lower', 'core')

const verticality = Joi.string().valid('horizontal', 'vertical')

const frontalPlane = Joi.string().valid('push', 'pull', 'rotational', 'lateral')

const kineticChain = Joi.string().valid('closed', 'open')

const motion = Joi.string().valid('isometric', 'isotonic', 'distance', 'timed')

const sagittalPlane = Joi.string().valid('bilateral', 'unilateral')

const exercise = {
  name: Joi.string().required(),
  abbreviation: Joi.string().allow(''),
  motionType: Joi.alternatives().try(
    Joi.object().keys({
      componentExercises,
    }),
    Joi.object().keys({
      transversePlane,
      verticality,
      frontalPlane,
      kineticChain,
      sagittalPlane,
      motion,
    }),
  ),
  potentialStages: Joi.array().items(Joi.string()),
  requirements: Joi.array().items(Joi.string()),
  description: Joi.string().allow(''),
}

module.exports = {
  exercise: (data) => Joi.object({ ...exercise }).validate(data),
  id: (data) => Joi.object({ _id: Joi.string().required() }).validate(data),
  editExercise: (data) =>
    Joi.object({
      _id: Joi.string().required(),
      ...exercise,
    }).validate(data),
}
