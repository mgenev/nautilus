// core
var http = require('http');
var path = require('path');
var express = require('express');

// express mods for auto binding of routes
var restify = require('express-restify-mongoose');
var expressControllers = require('express-controller');
// logger
var morgan = require('morgan');
// middleware
var bodyParser = require('body-parser'),
	  methodOverride = require('method-override');

// db related
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nautilus');
var db = mongoose.connection;

var ToDoSchema = new mongoose.Schema({
	text: { type: String, required: true },
	done: { type: Boolean, default: false }
});
var ToDoModel = mongoose.model('todo', ToDoSchema);

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
expressControllers.setDirectory( __dirname + '/controllers').bind(app, function () {
  restify.serve(app, ToDoModel, {
    //exclude: 'text,done'
  });
});

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(function (req, res) {
	// res.sendFile(path.join(__dirname, 'public/index.html'));
// });

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
