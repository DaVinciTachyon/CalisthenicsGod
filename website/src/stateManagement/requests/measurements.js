import axios from 'axios';

const post = (measurements) =>
  axios.request({
    method: 'post',
    url: '/measurement/',
    data: measurements,
  });

const get = (name = undefined) =>
  axios.request({
    method: 'get',
    url: `/measurement/${name ? `${name}/` : ''}`,
  });

const getHistory = (name) =>
  axios.request({
    method: 'get',
    url: `/measurement/${name}/history`,
  });

export { post, get, getHistory };
