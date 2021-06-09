import axios from 'axios';

const postIngredient = (ingredient) =>
  axios.request({
    method: 'post',
    url: '/nutrition/meals/preset/ingredient/',
    data: ingredient,
  });

const patchIngredient = (ingredient) =>
  axios.request({
    method: 'patch',
    url: '/nutrition/meals/preset/ingredient/',
    data: ingredient,
  });

const deleteIngredient = (ingredient) =>
  axios.request({
    method: 'delete',
    url: '/nutrition/meals/preset/ingredient/',
    data: ingredient,
  });

const get = () =>
  axios.request({
    method: 'get',
    url: '/nutrition/meals/preset/',
  });

const post = (meal) =>
  axios.request({
    method: 'post',
    url: '/nutrition/meals/preset/',
    data: meal,
  });

const deleteReq = (_id) =>
  axios.request({
    method: 'delete',
    url: '/nutrition/meals/preset/',
    data: { _id },
  });

const patch = (meal) =>
  axios.request({
    method: 'patch',
    url: '/nutrition/meals/preset/',
    data: meal,
  });

export {
  postIngredient,
  patchIngredient,
  deleteIngredient,
  get,
  post,
  deleteReq,
  patch,
};
