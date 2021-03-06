const router = require('express').Router();
const Ingredient = require('../models/Ingredient');
const nutrientValidation = require('../validation/nutrition');

router.use((req, res, next) => {
  next();
});

router
  .route('/')
  .get(async (req, res) => {
    const ingredients = await Ingredient.find({
      userId: req.user._id,
    });

    res.send({
      ingredients,
    });
  })
  .post(async (req, res) => {
    const { error } = nutrientValidation.ingredient(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const ingredientName = await Ingredient.findOne({
      userId: req.user._id,
      name: req.body.name,
    });
    if (ingredientName)
      return res.status(400).send({ error: 'Name already in use.' });

    const ingredient = new Ingredient({
      name: req.body.name,
      macronutrients: req.body.macronutrients,
      userId: req.user._id,
    });

    try {
      await ingredient.save();
      res.status(200).send(ingredient);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  })
  .delete(async (req, res) => {
    const { error } = nutrientValidation.id(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const ingredient = await Ingredient.findOne({
      userId: req.user._id,
      _id: req.body._id,
    });
    if (!ingredient) return res.status(400).send({ error: '_id not found' });

    ingredient.isAvailable = !ingredient.isAvailable;

    try {
      await ingredient.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  })
  .patch(async (req, res) => {
    const { error } = nutrientValidation.editIngredient(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const ingredient = await Ingredient.findOne({
      userId: req.user._id,
      _id: req.body._id,
    });
    if (!ingredient) return res.status(400).send({ error: '_id not found' });

    Object.keys(req.body).forEach(
      (name) => (ingredient[name] = req.body[name])
    );

    try {
      await ingredient.save();
      res.sendStatus(200);
    } catch (err) {
      res.status(400).send({ error: err });
    }
  });

module.exports = router;
