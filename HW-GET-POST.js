var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4243);

/* get form calls the handlebar: get-request-output to render. Push method was taken from lecture week 8 - Server Side form Handling.
Takes the two names: label and key, and makes an array object from the query. It can be iterated and output the labels and keys of the 
elements within the list. This way get-request-output.handlebars can access each label name by using this.label */
app.get('/get-request-output',function(req,res){
  var getquerylist = []; // intialize empty array
  for (var i in req.query){
    getquerylist.push({'label':i,'key':req.query[i]}) 
  }
  var context = {};
  context.getquerylist = getquerylist;
  res.render('get-request-output', context);
});


/* post form calls the handlebar: get-request-output to render. Push method was taken from lecture week 8 - Server Side form Handling.
Takes the two names: label and key, and makes an array object from the query. It can be iterated and output the labels and keys of the 
elements within the list. This way get-request-output.handlebars can access each label name by using this.label or this.blabel.
Two lists were made. One for the query, and one for the body. */
app.post('/post-request-output', function(req,res){
  var postquerylist = []; // intialize empty array for the QUERY
  var postbodylist = []; // Intialize empty array for the BODY
  for (var i in req.query){
    postquerylist.push({'label':i,'key':req.query[i]})
  }
  for (var i in req.body){
    postbodylist.push({'blabel':i,'bkey':req.body[i]})
  }
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
