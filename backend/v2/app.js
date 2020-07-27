'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: true}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//app.use(express.static('public'));

app.use('/media', express.static('media'))
app.use('/manuales', express.static('manuales'))
app.use('/audios', express.static('audios'))
app.use('/public', express.static('public'))

//*********************************************
//*********** V2 ***************************
//*********************************************
var backend = require('./routes/backend');
var prehost = require('./routes/prehost');
app.use('/v2/', backend);
app.use('/v2/', prehost);

app.get('/', (req, res) => {
  res.sendfile('index.html');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //next(err);
  res.json(err);
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