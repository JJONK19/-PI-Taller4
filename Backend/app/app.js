const express = require('express');
const cors = require('cors');

const app = express();

//configuracion
app.set('port', 3000);

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use(require('./routes/routes'));

module.exports = app;