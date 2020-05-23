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
		ingredientId: Joi.string().min(1).required(),
		weight: Joi.number().min(0.01).required()
	});
	return schema.validate(data);
};

nutrientValidation.ingredient = (data) => {
	const schema = Joi.object({
		_id: Joi.string().min(1),
		name: Joi.string().min(1).required(),
		fat: Joi.number().min(0).max(100).required(),
		carbohydrate: Joi.number().min(0).max(100).required(),
		protein: Joi.number().min(0).max(100).required(),
		ethanol: Joi.number().min(0).max(100).required()
	});
	return schema.validate(data);
};

nutrientValidation.meal = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(1).required(),
		ingredients: Joi.array().items(
			Joi.object({
				ingredientId: Joi.string().min(1).required(),
				weight: Joi.number().min(0.01).required()
			})
		)
	});
	return schema.validate(data);
};

module.exports = nutrientValidation;
