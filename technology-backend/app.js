var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
// var database = require('./database')

app.use(cors());

var mysql = require('mysql');

var deptRouter = require('./routes/dept');
var postRouter = require('./routes/post');
var plan = require('./routes/plan');
var userRouter = require('./routes/user');

var MyProject = require('./routes/myproject');

var Another = require('./routes/another');

var getPlan = require('./routes/getPlan');

var team = require('./routes/team');
///////////////////// team으로 합칠 내용들 /////////////////////////
var getTeamList = require('./routes/getTeamList');
var getUser = require('./routes/getUser');
var makeTeam = require('./routes/makeTeam');
var makeMember = require('./routes/makeMember');
var todosRouter = require('./routes/todos');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todos', todosRouter); // 
app.use('/dept', deptRouter);
app.use('/post', postRouter);
app.use('/plan', plan);
app.use('/user', userRouter);
app.use('/myproject', MyProject);
app.use('/getPlan', getPlan);
app.use('/another', Another);

app.use('/team', team);
////////////// team으로 합칠 내용들 ////////////////
app.use('/getTeamList', getTeamList);
app.use('/getUser', getUser);

app.use('/makeTeam', makeTeam);
app.use('/makeMember', makeMember);
//////////////////////////////////////
//////////////////////////////////////

var conn = mysql.createConnection({
  host:"192.168.31.65",
  port:3306,
  user:"root",
  password:"12345",
  database:"blog"
})

conn.connect((error) =>{
  console.log(error);
})
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  next();
});

module.exports = app;
