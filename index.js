const express = require('express');
const app = express();

const citiesRoutes = require('./routes/cities');

app.use(citiesRoutes.namespace, citiesRoutes.router);

app.listen(3000);