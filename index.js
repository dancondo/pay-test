const express = require('express');
const app = express();

const citiesRoutes = require('./routes/cities');
const docs = require('./routes/docs');

app.use(citiesRoutes.namespace, citiesRoutes.router);
app.use(docs.namespace, docs.router);

app.listen(3000);