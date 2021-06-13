import axios from 'axios';

const post = (exercise) =>
  axios.request({
    method: 'post',
    url: '/exercise/',
    data: exercise,
  });

const get = () =>
  axios.request({
    method: 'get',
    url: '/exercise/',
  });

const deleteReq = (_id) =>
  axios.request({
    method: 'delete',
    url: '/exercise/',
    data: { _id },
  });

const patch = (exercise) =>
  axios.request({
    method: 'patch',
    url: '/exercise/',
    data: exercise,
  });

export { post, get, deleteReq, patch };
