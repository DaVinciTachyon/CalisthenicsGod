import axios from 'axios';

const getCalories = async (
  fat,
  carbohydrate,
  protein,
  ethanol,
  weight = undefined
) => {
  const macroDensities = await getMacroDensities();
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

const getMacroDensities = async () => {
  if (!localStorage.getItem('macronutrientDensities')) {
    try {
      const data = (await axios.get('/nutrition/macronutrientDensities/')).data;
      localStorage.setItem('macronutrientDensities', JSON.stringify(data));
    } catch (err) {
      console.error(err.response);
    }
  }
  return JSON.parse(localStorage.getItem('macronutrientDensities'));
};

export { getCalories, getMacroDensities };
