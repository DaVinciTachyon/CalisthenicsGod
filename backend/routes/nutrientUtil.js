const macronutrientDensities = {
  fat: 9,
  carbohydrate: 4,
  protein: 4,
  ethanol: 7,
};

const round = (num, decimals) =>
  Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

const getMaintenanceCalories = (bodyweight, calsPerKilo) =>
  round(calsPerKilo * bodyweight, 1);

const getProteinGrams = (bodyweight, gramsPerKilo) =>
  round(gramsPerKilo * bodyweight, 1);

const getFatGrams = (calories, calProportion) =>
  round((calProportion * calories) / macronutrientDensities.fat, 1);

const getCarbohydrateGrams = (calories, fatCalories, proteinCalories) =>
  round(
    (calories - fatCalories - proteinCalories) /
      macronutrientDensities.carbohydrate,
    1
  );

const getEthanolGrams = () => 0;

const getFiberGrams = (carbohydrateCalories, constant = 100) =>
  round(carbohydrateCalories / constant, 1);

const getWaterLitres = (bodyweight) => round(bodyweight * 0.0435, 1);

module.exports = {
  macronutrientDensities,
  getMaintenanceCalories,
  getProteinGrams,
  getFatGrams,
  getCarbohydrateGrams,
  getEthanolGrams,
  getFiberGrams,
  getWaterLitres,
};
