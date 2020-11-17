var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4242);

app.get('/get-request-output',function(req,res){
  var getquerylist = [];
  for (var i in req.query){
    getquerylist.push({'label':i,'key':req.query[i]})
  }
  var context = {};
  context.getquerylist = getquerylist;
  res.render('get-request-output', context);
});

app.post('/post-request-output', function(req,res){
  var postquerylist = [];
  var postbodylist = [];
  for (var i in req.query){
    postquerylist.push({'label':i,'key':req.query[i]})
  }
  for (var i in req.body){
    postbodylist.push({'blabel':i,'bkey':req.body[i]})
  }
  console.log(qParams);
  console.log(req.body);
  var context = {};
  context.postquerylist = postquerylist;
  context.postbodylist = postbodylist;
  res.render('post-request-output', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
