const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const citiesRoutes = require('./routes/cities');
const docsRoutes = require('./routes/docs');
const { errorResponse } = require('./utils/errors')

app.use(bodyParser.json())
app.use(citiesRoutes.namespace, citiesRoutes.router);
app.use(docsRoutes.namespace, docsRoutes.router);
app.use(errorResponse);

module.exports = app;