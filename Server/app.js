var express = require('express');
var bodyparser = require('body-parser');
var routes = require('./Routes/routes');
var path = require('path');

var app = express();
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());
app.use(express.static('../public/html'));
app.use(express.static('../public/js'));

routes.configure(app);

var server = app.listen(8000, function() {
	console.log("Server listening on port %s!\n", server.address().port);
});