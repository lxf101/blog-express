var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const {RedisStore} = require('connect-redis');


var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express();

const ENV = process.env.NODE_ENV;
if(ENV !== 'production'){
  // development and test environment
  app.use(logger('dev'));
} else {
  // online environment
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fstat.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined'), {
    stream: writeStream
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const redisClient = require('./db/redis');
const { fstat } = require('fs');

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:"
})

app.use(session({
  secret: 'Dasae&87932#dafd0dj$asDKA#',
  cookie: {
    path: '/',  // default set
    httpOnly: true, // default set
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore,    // session save into redis
  resave: false,
  saveUninitialized: false 
}))

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

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
