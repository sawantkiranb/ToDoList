// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
var items = [];
let workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var today = new Date();

  var options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render('list', {
    listTitle: day,
    items: items
  });

});

app.post('/', function(req, res) {
  var item = req.body.newItem;

  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }

});

app.get('/work', function(req, res) {
  res.render('list', {
    listTitle: 'Work',
    items: workItems
  });
});

app.get('/about',function(req,res){
  res.render('about');
});


app.listen(3000, function() {
  console.log('Server is running on port 3000...');
});
