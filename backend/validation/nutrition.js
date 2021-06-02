const { required } = require('@hapi/joi');
const Joi = require('@hapi/joi');

const macronutrients = Joi.object({
  fat: Joi.number().min(0).max(100).required(),
  carbohydrate: Joi.number().min(0).max(100).required(),
  protein: Joi.number().min(0).max(100).required(),
  ethanol: Joi.number().min(0).max(100).required(),
});

const ingredientRef = Joi.object({
  id: Joi.string().min(1).required(),
  weight: Joi.number().min(0.01).required(),
});

const mealIngredient = Joi.object({
  _id: Joi.string().min(1).required(),
  weight: Joi.number().min(0.01).required(),
});

const _id = Joi.string();

const name = Joi.string().min(1).required();

module.exports = {
  userInfo: (data) =>
    Joi.object({
      calorieOffset: Joi.number().required(),
      caloriesPerKg: Joi.number().min(0).required(),
      proteinGramsPerKg: Joi.number().min(0).required(),
      fatCalorieProportion: Joi.number().min(0).max(1).required(),
    }).validate(data),
  ingredient: (data) =>
    Joi.object({
      name,
      macronutrients,
    }).validate(data),
  editIngredient: (data) =>
    Joi.object({
      _id: _id.required(),
      name,
      macronutrients,
    }).validate(data),
  presetMeal: (data) =>
    Joi.object({
      name,
      ingredients: Joi.array().items(ingredientRef),
    }).validate(data),
  id: (data) => Joi.object({ _id: _id.required() }).validate(data),
  mealIngredient: (data) =>
    Joi.object({ _id: _id.required(), ingredient: ingredientRef }).validate(
      data
    ),
  mealIngredientEdit: (data) =>
    Joi.object({ _id: _id.required(), ingredient: mealIngredient }).validate(
      data
    ),
  mealIngredientId: (data) =>
    Joi.object({
      _id: _id.required(),
      ingredient: { _id: _id.required() },
    }).validate(data),
  meal: (data) =>
    Joi.object({ _id, ingredient: ingredientRef.required() }).validate(data),
};
