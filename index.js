const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const apiRoute = require('./routes/api');

require('dotenv').config();
require('dotenv-defaults').config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
	console.log('connected to db')
);

//app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());
app.use('/', apiRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server up and running'));
