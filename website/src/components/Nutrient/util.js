const getCalories = (
  fat,
  carbohydrate,
  protein,
  ethanol,
  weight = undefined
) => {
  const macroDensities = localStorage.getItem('macronutrientDensities');
  if (weight)
    return (
      ((fat * macroDensities.fat +
        carbohydrate * macroDensities.carbohydrate +
        protein * macroDensities.protein +
        ethanol * macroDensities.ethanol) *
        weight) /
      100
    );
  return (
    fat * macroDensities.fat +
    carbohydrate * macroDensities.carbohydrate +
    protein * macroDensities.protein +
    ethanol * macroDensities.ethanol
  );
};

module.exports = { getCalories };
