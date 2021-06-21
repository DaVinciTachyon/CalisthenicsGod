const Joi = require('@hapi/joi');

const _id = Joi.string().min(1);

const weight = Joi.number().min(0.01);

const macronutrient = Joi.number().min(0).max(100);

const name = Joi.string().min(1).required();

const macronutrients = Joi.object({
  fat: macronutrient.required(),
  carbohydrate: macronutrient.required(),
  protein: macronutrient.required(),
  ethanol: macronutrient.required(),
});

const ingredientRef = Joi.object({
  id: _id.required(),
  weight: weight.required(),
});

module.exports = {
  userInfo: (data) =>
    Joi.object({
      calorieOffset: Joi.number().required().min(0),
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
      _id,
      name,
      ingredients: Joi.array().items(ingredientRef),
    }).validate(data),
  presetMealEdit: (data) =>
    Joi.object({
      _id,
      name,
      ingredients: Joi.array().items(
        Joi.object({
          _id: _id.required(),
          id: _id,
          weight: weight.required(),
        })
      ),
    }).validate(data),
  id: (data) => Joi.object({ _id: _id.required() }).validate(data),
  mealIngredient: (data) =>
    Joi.object({
      _id: _id.required(),
      ingredient: {
        _id: _id.required(),
        weight: Joi.number().min(0.01).required(),
      },
    }).validate(data),
  mealAddIngredient: (data) =>
    Joi.object({
      _id: _id.required(),
      ingredient: {
        id: _id.required(),
        weight: Joi.number().min(0.01).required(),
      },
    }).validate(data),
  mealIngredientEdit: (data) =>
    Joi.object({
      _id: _id.required(),
      ingredient: Joi.object({
        _id: _id.required(),
        id: _id,
        weight: weight.required(),
      }),
    }).validate(data),
  mealIngredientId: (data) =>
    Joi.object({
      _id: _id.required(),
      ingredient: { _id: _id.required() },
    }).validate(data),
  meal: (data) =>
    Joi.object({ _id, ingredient: ingredientRef.required() }).validate(data),
};
