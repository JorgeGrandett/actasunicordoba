const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//middlewares
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

//Rutas
app.use(require('./src/routes/main.route'));
app.use(require('./src/routes/usuario.route'));
app.use(require('./src/routes/acta.route'));

module.exports = app;