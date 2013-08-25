var express = require('express');
var _ = require('underscore');
var app = express();
var server = require('http').createServer(app);
var parseCookie = require('./lib/cookie_parser');
var config = require('./lib/config');
var words = require('./lib/words');

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'sooo secret'}));

app.use(app.router);

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/search', function (req, res) {
  var result = words.search(req.body.pattern);
  res.render('result', { words: result });
});

server.listen(process.env.PORT || config.port);