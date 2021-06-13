import axios from 'axios';

const postLogIn = (stage) =>
  axios.request({
    method: 'post',
    url: '/auth/login/',
    data: stage,
  });

const postRegister = (stage) =>
  axios.request({
    method: 'post',
    url: '/auth/register/',
    data: stage,
  });

export { postLogIn, postRegister };
