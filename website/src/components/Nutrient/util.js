import axios from 'axios';
import { loadState, saveState } from '../util';

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
  let state = loadState('macronutrientDensities');
  if (!state) {
    try {
      state = (await axios.get('/nutrition/macronutrientDensities/')).data;
    } catch (err) {
      console.error(err.response);
    }
    saveState('macronutrientDensities', state);
  }
  return state;
};

export { getCalories, getMacroDensities };
