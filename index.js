const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const citiesRoutes = require('./routes/cities');
const docsRoutes = require('./routes/docs');
const { errorResponse } = require('./utils/errors')

app.use(bodyParser.json())
app.use(citiesRoutes.namespace, citiesRoutes.router);
app.use(docsRoutes.namespace, docsRoutes.router);
app.use(errorResponse);

const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'

app.listen(port, host);