const Joi = require('@hapi/joi');

const subName = Joi.string().min(3).max(255);

const name = Joi.object({
  first: subName.required(),
  middle: subName,
  last: subName.required(),
});

const email = Joi.string().min(5).email();

const gender = Joi.string().valid('male', 'female');

const birthDate = Joi.date();

const password = Joi.string().min(6);

const weight = Joi.number();

module.exports = {
  register: (data) =>
    Joi.object({
      name,
      email: email.required(),
      password: password.required(),
      weight: weight.required(),
      birthDate: birthDate.required(),
      gender: gender.required(),
    }).validate(data),
  login: (data) =>
    Joi.object({
      email: email.required(),
      password: password.required(),
    }).validate(data),
  userInfo: (data) =>
    Joi.object({
      name,
      email,
      birthDate,
      gender,
    }).validate(data),
};
