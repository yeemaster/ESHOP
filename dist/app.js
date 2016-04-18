var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var userhome = require('./routes/userhome');
var register = require('./routes/register');
var accountinfo = require('./routes/accountinfo');
var hotel = require('./routes/hotel');
var hoteldesc = require('./routes/hoteldesc');
var hoteldetail = require('./routes/hoteldetail');
var streetmap = require('./routes/streetmap');
var shopmap = require('./routes/shopmap');
var dbInit = require('./models/db');
var myglobal = require('./models/myglobal');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

dbInit();
app.locals._var_net = myglobal.net;

app.use('/', routes);
app.use('/users', users);
app.use('/login',login);
app.use('/userhome',userhome);
app.use('/register',register);
app.use('/accountinfo',accountinfo);
app.use('/hotel',hotel);
app.use('/hoteldesc',hoteldesc);
app.use('/hoteldetail',hoteldetail);
app.use('/streetmap',streetmap);
app.use('/shopmap',shopmap);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
