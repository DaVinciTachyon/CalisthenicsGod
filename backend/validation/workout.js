const Joi = require('@hapi/joi');

module.exports = {
    stage: (data) => Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            chronologicalRanking: Joi.number().min(0).required()
        }).validate(data)
};