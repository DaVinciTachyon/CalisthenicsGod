const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routesCentre');
const app = express();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
	console.log('Connected To Database')
);
mongoose.set('useFindAndModify', false);

dotenv.config();

const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
	console.log('CalisthenicsGod Server On');
});
