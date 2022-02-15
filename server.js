const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middlewares
app.use(bodyParser.json());

//Rutas
app.use(require('./src/routes/main.route'));
app.use(require('./src/routes/usuario.route'));
app.use(require('./src/routes/acta.route'));

module.exports = app;