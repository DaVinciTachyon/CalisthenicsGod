const Joi = require('@hapi/joi');

let nutrientValidation = {}

nutrientValidation.calorieOffset = (data) => {
    const schema = Joi.object({
        calorieOffset: Joi.number(),
    });
    return schema.validate(data);
};

nutrientValidation.mealHistory = (data) => {
    const schema = Joi.object({
        history: Joi.array().items(),//complete this
    });
    return schema.validate(data);
};

nutrientValidation.ingredient = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        fat: Joi.number().min(0).required(),
        carbohydrate: Joi.number().min(0).required(),
        protein: Joi.number().min(0).required(),
        ethanol: Joi.number().min(0).required()
    });
    return schema.validate(data);
};

module.exports = nutrientValidation;
