const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const appUrl = process.env.APP_URL || "http://127.0.0.1:8080";
const app = supertest(appUrl);

chai.use(chaiHttp);

const post = (url, body, callback) => {
    app.post(url)
        .send(body)
        .end((err, res) => callback(err, res));
}

const get = (url, callback) => {
    app.post(url)
        .end((err, res) => callback(err, res));
}

module.exports = {
    post,
    get
}