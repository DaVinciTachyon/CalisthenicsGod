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

export { get, patch };
