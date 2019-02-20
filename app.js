var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require('./models/dbcon.js');
var helmet = require('helmet');
var bodyParser = require('body-parser');

// route variables
var indexRouter = require('./routes/index');
var generic = require('./routes/generic');
var elements = require('./routes/elements');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/adminIndex');
var adminEmployeesRouter = require('./routes/adminEmployees');
var createAccount = require('./routes/createAccount');
var login = require('./routes/login');
var userIndex = require('./routes/userIndex');
var userSettings = require('./routes/userSettings');
var createAward = require('./routes/createAward');

var app = express();

//DB Practice
/*
let sql = `SELECT * FROM employee
           ORDER BY fname`;
 
sqlite3.db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.fname);
  });
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('sqlite3', sqlite3);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// views
app.use('/', indexRouter);
app.use('/generic', generic);
app.use('/elements', elements);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/adminEmployees', adminEmployeesRouter);
app.use('/createAccount', createAccount);
app.use('/login', login);
app.use('/userIndex', userIndex);
app.use('/userSettings', userSettings);
app.use('/createAward', createAward);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;