const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routesCentre');
const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	if(err) return console.error(err);
	app.emit("ready");
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use('/', routes);

app.on("ready", () => {
	const server = app.listen(port, (err) => {
		if(err) return console.error(err);
		const host = server.address().address;
		const port = server.address().port;
		console.log('Listening at http://%s:%s', host, port);
	});
});