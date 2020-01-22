const app = require('./server');
require('dotenv').config();

const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host);

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', function onSigint () {
	console.info('Got SIGINT. Shuttinh down');
  shutdown();
});

// shut down server
function shutdown() {
	process.exit();
}
