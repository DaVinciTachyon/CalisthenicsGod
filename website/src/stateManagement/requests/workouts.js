import axios from 'axios';

const post = (workout) =>
  axios.request({
    method: 'post',
    url: '/workout/',
    data: workout,
  });

const get = () =>
  axios.request({
    method: 'get',
    url: '/workout/',
  });

export { post, get };
