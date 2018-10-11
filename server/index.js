require('newrelic');
const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const compression = require('compression');

app.use(bodyParser.json());
app.use(compression());

app.use('/:id', express.static('public'));

app.set('port', process.env.PORT || 8080);

app.get('/api/reviews/:nameOrId', proxy(''));
app.post('/api/reviews', proxy('http://localhost:3002'));

app.listen(app.get('port'), () => {
  console.log(`app is listening to port ${app.get('port')}`);
});
