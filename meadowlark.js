//imports
var forturn = require('./lib/fortune.js');  // the ./ tells Node not to look in node_modules

var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));  // static middleware

// Default Home
app.get('/', function(req,res) {
  res.render('home');
});

// About page
app.get('/about', function(req,res) {
  res.render('about', {fortune: fortune.getFortune() } );
});

// custom 404 page
app.use(function(req,res) {
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function(req,res) {
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate....' );
});
