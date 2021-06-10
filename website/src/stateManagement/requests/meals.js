import axios from 'axios';

const get = () =>
  axios.request({
    method: 'get',
    url: '/nutrition/meals/',
  });

const post = (meal) =>
  axios.request({
    method: 'post',
    url: '/nutrition/meals/',
    data: meal,
  });

const deleteReq = (ingredient) =>
  axios.request({
    method: 'delete',
    url: '/nutrition/meals/',
    data: ingredient,
  });

const patch = (meal) =>
  axios.request({
    method: 'patch',
    url: '/nutrition/meals/',
    data: meal,
  });

const postPresetMeal = (_id) =>
  axios.request({
    method: 'post',
    url: '/nutrition/meals/addPreset/',
    data: { _id },
  });

export { get, post, deleteReq, patch, postPresetMeal };
