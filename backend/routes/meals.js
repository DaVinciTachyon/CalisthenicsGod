const router = require('express').Router()
const verify = require('./tokenVerification')
const NutrientInfo = require('../models/NutrientInfo')
const Ingredient = require('../models/Ingredient')
const Meal = require('../models/Meal')
const nutrientValidation = require('../validation/nutrition')
const presetMealsRoute = require('./presetMeals')

/**
 * Find if today's date
 * @param {Date} date
 */
const isToday = (date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

router.use(verify, (req, res, next) => {
  next()
})

router
  .route('/')
  .get(async (req, res) => {
    const nutrients = await NutrientInfo.findOne({ userId: req.user._id })
    const day = nutrients.history[0]
    let meals = []
    if (hasHistory(nutrients) && isToday(day.date)) meals = day.meals
    res.status(200).send({ meals })
  })
  .delete(async (req, res) => {
    const { error } = nutrientValidation.mealId(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })

    const nutrients = await NutrientInfo.findOne({ userId: req.user._id })
    const meals = nutrients.history[0].meals

    const mealIndex = meals.findIndex((meal) => meal._id == req.body._id)
    if (mealIndex === -1)
      return res.status(400).send({ error: 'Invalid Meal ID' })
    meals.splice(mealIndex, 1)

    try {
      await nutrients.save()
      res.sendStatus(200)
    } catch (err) {
      res.status(400).send({ error: err })
    }
  })

router
  .route('/ingredient')
  .patch(async (req, res) => {
    const { error } = nutrientValidation.mealIngredientEdit(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })

    const nutrients = await NutrientInfo.findOne({ userId: req.user._id })
    const day = nutrients.history[0]
    const mealIndex = day.meals.findIndex((val) => val._id == req.body._id)
    if (mealIndex === -1)
      return res.status(400).send({ error: 'Invalid Meal ID' })

    const ingredients = day.meals[mealIndex].ingredients
    const ingredientIndex = ingredients.findIndex(
      (val) => val._id == req.body.ingredient._id,
    )
    if (ingredientIndex === -1)
      return res.status(400).send({ error: 'Invalid Ingredient ID' })

    ingredients[ingredientIndex].weight = req.body.ingredient.weight

    try {
      await nutrients.save()
      res.sendStatus(200)
    } catch (err) {
      res.status(400).send({ error: err })
    }
  })
  .post(async (req, res) => {
    const { error } = nutrientValidation.meal(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })

    const ingredient = await Ingredient.findOne({
      userId: req.user._id,
      _id: req.body.ingredient.id,
    })
    if (!ingredient)
      return res.status(400).send({ error: 'Invalid Ingredient ID' })

    const nutrients = await NutrientInfo.findOne({ userId: req.user._id })

    if (
      req.body._id &&
      hasHistory(nutrients) &&
      isToday(nutrients.history[0].date) &&
      hasMeals(nutrients.history[0])
    ) {
      const day = nutrients.history[0]
      const meal = day.meals.findIndex((info) => info._id == req.body._id)
      if (meal === -1)
        return res.status(400).send({ error: 'Incorrect Meal ID' })

      day.meals[meal].ingredients.push(req.body.ingredient)
    } else if (hasHistory(nutrients) && isToday(nutrients.history[0].date))
      nutrients.history[0].meals.unshift({
        ingredients: [req.body.ingredient],
      })
    else
      nutrients.history.unshift({
        meals: [
          {
            ingredients: [req.body.ingredient],
          },
        ],
      })

    const index = nutrients.history[0].meals.findIndex(
      (info) => info._id == req.body._id,
    )
    const { _id, ingredients } = nutrients.history[0].meals[
      index === -1 ? 0 : index
    ]
    try {
      await nutrients.save()
      res.status(200).send({
        _id,
        ingredient: {
          _id: ingredients[ingredients.length - 1]._id,
        },
      })
    } catch (err) {
      res.status(400).send({ error: err })
    }
  })
  .delete(async (req, res) => {
    const { error } = nutrientValidation.mealIngredientId(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })

    const nutrients = await NutrientInfo.findOne({ userId: req.user._id })
    const meals = nutrients.history[0].meals

    const mealIndex = meals.findIndex((meal) => meal._id == req.body._id)
    if (mealIndex === -1)
      return res.status(400).send({ error: 'Invalid Meal ID' })
    const ingredients = meals[mealIndex].ingredients

    const ingredientIndex = ingredients.findIndex(
      (ingredient) => ingredient._id == req.body.ingredient._id,
    )
    if (ingredientIndex === -1)
      return res.status(400).send({ error: 'Invalid Ingredient ID' })

    if (ingredients.length > 1) ingredients.splice(ingredientIndex, 1)
    else meals.splice(mealIndex, 1)

    try {
      await nutrients.save()
      res.sendStatus(200)
    } catch (err) {
      res.status(400).send({ error: err })
    }
  })

const hasHistory = (nutrients) =>
  nutrients.history !== undefined && nutrients.history.length > 0

const hasMeals = (day) => day.meals !== undefined && day.meals.length > 0

router.post('/addPreset', async (req, res) => {
  const { error } = nutrientValidation.id(req.body)
  if (error) return res.status(400).send({ error: error.details[0].message })

  const meal = await Meal.findById(req.body._id)
  if (!meal) return res.status(400).send({ error: 'Invalid Meal ID' })
  if (meal.ingredients.length === 0)
    return res.status(400).send({ error: 'No Ingredient' })

  const nutrients = await NutrientInfo.findOne({ userId: req.user._id })

  if (hasHistory(nutrients) && isToday(nutrients.history[0].date))
    nutrients.history[0].meals.unshift({ ingredients: [] })
  else nutrients.history.unshift({ meals: [{ ingredients: [] }] })

  const ingredients = nutrients.history[0].meals[0].ingredients
  for (const ingredient of meal.ingredients) {
    const fullIngredient = await Ingredient.findOne({
      userId: req.user._id,
      _id: ingredient.id,
    })
    if (!fullIngredient)
      return res.status(400).send({ error: 'Invalid Ingredient ID' })

    ingredients.push({ id: ingredient.id, weight: ingredient.weight })
  }

  try {
    await nutrients.save()
    res.status(200).send(nutrients.history[0].meals[0])
  } catch (err) {
    res.status(400).send({ error: err })
  }
})

router.use('/preset', presetMealsRoute)

module.exports = router
