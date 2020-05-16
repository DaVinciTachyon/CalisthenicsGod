const Joi = require('@hapi/joi');

let nutrientValidation = {};

nutrientValidation.calorieOffset = (data) => {
	const schema = Joi.object({
		calorieOffset: Joi.number()
	});
	return schema.validate(data);
};

nutrientValidation.mealIngredient = (data) => {
	const schema = Joi.object({
		ingredientId: Joi.string().min(1), //FIXME
		weight: Joi.number().min(0.01),
		name: Joi.string().min(1),
		fat: Joi.number().min(0),
		carbohydrate: Joi.number().min(0),
		protein: Joi.number().min(0),
		ethanol: Joi.number().min(0)
	});
	return schema.validate(data);
};

nutrientValidation.ingredient = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(1).required(),
		fat: Joi.number().min(0).max(100).required(),
		carbohydrate: Joi.number().min(0).max(100).required(),
		protein: Joi.number().min(0).max(100).required(),
		ethanol: Joi.number().min(0).max(100).required()
	});
	return schema.validate(data);
};

module.exports = nutrientValidation;
