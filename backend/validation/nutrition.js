const Joi = require('@hapi/joi');

module.exports = {
  calorieOffset: (data) =>
    Joi.object({
      calorieOffset: Joi.number(),
    }).validate(data),
  mealIngredient: (data) =>
    Joi.object({
      _id: Joi.string().min(1).required(),
      weight: Joi.number().min(0.01).required(),
    }).validate(data),
  ingredient: (data) =>
    Joi.object({
      _id: Joi.string().min(1),
      name: Joi.string().min(1).required(),
      fat: Joi.number().min(0).max(100).required(),
      carbohydrate: Joi.number().min(0).max(100).required(),
      protein: Joi.number().min(0).max(100).required(),
      ethanol: Joi.number().min(0).max(100).required(),
    }).validate(data),
  meal: (data) =>
    Joi.object({
      name: Joi.string().min(1).required(),
      ingredients: Joi.array().items(
        Joi.object({
          ingredientId: Joi.string().min(1).required(),
          weight: Joi.number().min(0.01).required(),
        })
      ),
    }).validate(data),
};
