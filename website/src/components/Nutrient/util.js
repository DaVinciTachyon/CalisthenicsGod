import axios from 'axios'
import { loadState, saveState } from '../util'
import { error } from '../../stateManagement/reducers/notification'

const getCalories = async (
  fat,
  carbohydrate,
  protein,
  ethanol,
  weight = undefined,
) => {
  const macroDensities = await getMacroDensities()
  if (weight)
    return (
      ((fat * macroDensities.fat +
        carbohydrate * macroDensities.carbohydrate +
        protein * macroDensities.protein +
        ethanol * macroDensities.ethanol) *
        weight) /
      100
    )
  return (
    fat * macroDensities.fat +
    carbohydrate * macroDensities.carbohydrate +
    protein * macroDensities.protein +
    ethanol * macroDensities.ethanol
  )
}

const getMacroDensities = async () => {
  let state = loadState('macronutrientDensities')
  if (!state) {
    try {
      const response = await axios.get('/nutrition/macronutrientDensities/')
      state = response.data
    } catch (err) {
      error(err.response.data.error)
    }
    saveState('macronutrientDensities', state)
  }
  return state
}

export { getCalories, getMacroDensities }
