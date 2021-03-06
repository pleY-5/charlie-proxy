require('newrelic');
const express = require('express');
const app = express();
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

app.use(bodyParser.json());
app.use(compression());

app.use('/loaderio-b946553f80839298d4edc7110d658ebc.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'loaderio-b946553f80839298d4edc7110d658ebc.txt'));
});

app.use('/:id', express.static('public'));

app.set('port', process.env.PORT || 8080);

app.get('/api/reviews/:nameOrId', proxy('http://54.245.44.44'));

// app.post('/api/reviews', proxy('ec2-34-216-225-31.us-west-2.compute.amazonaws.com'));

app.listen(app.get('port'), () => {
  console.log(`app is listening to port ${app.get('port')}`);
});
