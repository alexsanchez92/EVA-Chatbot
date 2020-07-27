'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var helmet = require('helmet');
var cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: true}));

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/manuales', express.static('manuales'))
app.use('/media', express.static('media'))
app.use('/public', express.static('public'))

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json());

//*********************************************
//*********** V1 ***************************
//*********************************************
var backend = require('./routes/backend');
var prehost = require('./routes/prehost');
app.use('/v1/', backend);
app.use('/v1/', prehost);

/*
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;