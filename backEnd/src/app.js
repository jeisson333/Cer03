const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors = require('cors');

// variables de entorno para la conf. de cloudinary
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;
//configuracion cloudinary

const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_KEY,
	api_secret: CLOUD_SECRET,
});

const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(cors());

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
