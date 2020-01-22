const app = require('./server');
require('dotenv').config();

const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'

app.listen(port, host);