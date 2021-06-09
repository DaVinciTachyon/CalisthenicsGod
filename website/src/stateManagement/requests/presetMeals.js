import axios from 'axios';

const postIngredient = (ingredient) =>
  axios.request({
    method: 'post',
    url: '/nutrition/meals/preset/ingredient/',
    data: ingredient,
  });

const get = () =>
  axios.request({
    method: 'get',
    url: '/nutrition/meals/preset/',
  });

const deleteReq = (_id) =>
  axios.request({
    method: 'delete',
    url: '/nutrition/meals/preset/',
    data: { _id },
  });

export { postIngredient, get, deleteReq };
