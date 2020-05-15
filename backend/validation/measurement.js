const Joi = require('@hapi/joi');

let measurementValidation = {}

measurementValidation.all = (data) => {
    const schema = Joi.object({
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
    });
    return schema.validate(data);
};

measurementValidation.weight = (data) => {
    const schema = Joi.object({
        weight: Joi.number().min(0.01).required(),
    });
    return schema.validate(data);
};

module.exports = measurementValidation;
