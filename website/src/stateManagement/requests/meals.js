import axios from 'axios'

const get = () =>
  axios.request({
    method: 'get',
    url: '/nutrition/meals/',
  })

const deleteReq = (_id) =>
  axios.request({
    method: 'delete',
    url: '/nutrition/meals/',
    data: { _id },
  })

const postIngredient = (ingredient) =>
  axios.request({
    method: 'post',
    url: '/nutrition/meals/ingredient/',
    data: ingredient,
  })

const deleteIngredient = (ingredient) =>
  axios.request({
    method: 'delete',
    url: '/nutrition/meals/ingredient/',
    data: ingredient,
  })

const patchIngredient = (ingredient) =>
  axios.request({
    method: 'patch',
    url: '/nutrition/meals/ingredient/',
    data: ingredient,
  })

const postPresetMeal = (_id) =>
  axios.request({
    method: 'post',
    url: '/nutrition/meals/addPreset/',
    data: { _id },
  })

export {
  get,
  deleteReq,
  postIngredient,
  patchIngredient,
  deleteIngredient,
  postPresetMeal,
}
