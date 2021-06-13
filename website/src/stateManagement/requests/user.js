import axios from 'axios';

const get = () =>
  axios.request({
    method: 'get',
    url: '/user/',
  });

const patch = (user) =>
  axios.request({
    method: 'patch',
    url: '/user/',
    data: user,
  });

const getNutritionInfo = () =>
  axios.request({
    method: 'get',
    url: '/nutrition/',
  });

const patchNutritionInfo = (nutrientInfo) =>
  axios.request({
    method: 'patch',
    url: '/nutrition/',
    data: nutrientInfo,
  });

export { get, patch, getNutritionInfo, patchNutritionInfo };
