import axios from 'axios';

const post = (stage) =>
  axios.request({
    method: 'post',
    url: '/workout/stage/',
    data: stage,
  });

const get = () =>
  axios.request({
    method: 'get',
    url: '/workout/stage/',
  });

const deleteReq = (_id) =>
  axios.request({
    method: 'delete',
    url: '/workout/stage/',
    data: { _id },
  });

const patch = (stage) =>
  axios.request({
    method: 'patch',
    url: '/workout/stage/',
    data: stage,
  });

export { post, get, patch, deleteReq };
