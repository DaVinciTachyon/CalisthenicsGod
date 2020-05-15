const Joi = require('@hapi/joi');

let authorisationValidation = {};

authorisationValidation.register = (data) => {
    const schema = Joi.object({
        name: Joi.object({
            first: Joi.string().min(3).max(255).required(),
            middle: Joi.string().min(3).max(255),
            last: Joi.string().min(3).max(255).required(),
        }),
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required(),
        weight: Joi.number().required(),
        birthDate: Joi.date().required(),
        gender: Joi.string().valid('male', 'female').required()
    });
    return schema.validate(data);
};

authorisationValidation.login = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

module.exports = authorisationValidation;
