const Joi = require('@hapi/joi');

module.exports = {
    stage: (data) => Joi.object({
            name: Joi.string().required(),
            chronologicalRanking: Joi.number().min(0).required(),
            description: Joi.string()
        }).validate(data)
};