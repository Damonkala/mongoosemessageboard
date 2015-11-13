'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);


var app = express();

app.set('view engine', 'jade');

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// ROUTES
// app.use('/', require('./routes/index'));
app.use('/posts', require('./routes/posts'));
app.use('/', require('./routes/posts'));

// 404 HANDLER
app.use(function(req, res){
  res.status(404).render('404')
})

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
