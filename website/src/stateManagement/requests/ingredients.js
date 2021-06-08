import axios from 'axios';

const post = (ingredient) =>
  axios.request({
    method: 'post',
    url: '/nutrition/ingredients/',
    data: ingredient,
  });

const get = () =>
  axios.request({
    method: 'get',
    url: '/nutrition/ingredients/',
  });

const deleteReq = (_id) =>
  axios.request({
    method: 'delete',
    url: '/nutrition/ingredients/',
    data: { _id },
  });

const patch = (ingredient) =>
  axios.request({
    method: 'patch',
    url: '/nutrition/ingredients/',
    data: ingredient,
  });

export { post, get, deleteReq, patch };
