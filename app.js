// module variables
var createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    sqlite3 = require('./models/dbcon.js'),
    helmet = require('helmet'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    session = require('express-session'),
    sequelize = require('sequelize'),
    nodemailer = require('nodemailer');
    pdf = require('pdfkit');

// route variables
var indexRouter = require('./routes/index'),
    generic = require('./routes/generic'),
    elements = require('./routes/elements'),
    usersRouter = require('./routes/users'),
    adminRouter = require('./routes/adminIndex'),
    adminAwardsRouter = require('./routes/adminAwards'),
    adminAwardTypesRouter = require('./routes/adminAwardTypes'),
    adminUsersRouter = require('./routes/adminUsers'),
    adminEmployeesRouter = require('./routes/adminEmployees'),
    adminBusinessRouter = require('./routes/adminBusiness'),
    adminAccountRouter = require('./routes/adminAccount'),
    createAccount = require('./routes/createAccount'),
    login = require('./routes/login'),
    userIndex = require('./routes/userIndex'),
    userAccount = require('./routes/userAccount'),
    userSettings = require('./routes/userSettings'),
    createAward = require('./routes/createAward');
    updateAward = require('./routes/updateAward');

// Email Transporter
require('dotenv').config();
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASSWORD
     }
 });

// application variable
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('sqlite3', sqlite3);

//  middlewares
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
app.use('/admin/awards', adminAwardsRouter);
app.use('/admin/awardTypes', adminAwardTypesRouter);
app.use('/admin/users', adminUsersRouter);
app.use('/admin/employees', adminEmployeesRouter);
app.use('/admin/business', adminBusinessRouter);
app.use('/admin/account', adminAccountRouter);
app.use('/createAccount', createAccount);
app.use('/login', login);
app.use('/userIndex', userIndex);
app.use('/userAccount', userAccount);
app.use('/userSettings', userSettings);
app.use('/createAward', createAward);
app.use('/updateAward', updateAward);

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