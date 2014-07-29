var express = require('express'),
  db = require('./models/index.js'),
  ejs = require('ejs'),
  bodyParser = require('body-parser'),
  app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));


app.get('/blog', function(req, res) {
  db.post.findAll().success(function(posts) {
    res.render('site/index', {posts: posts});
  });
});

app.get('/user/:id', function(req, res) {
  var userId = req.params.id;  
  db.author.find(userId).success(function(author) {
    console.log(author);
    author.getPosts().success(function(associatedPosts) {
      console.log(associatedPosts);
      res.render('posts/show', {posts: associatedPosts, author: author});
    });
  });
});

app.get('/blog/new', function(req, res) {
  res.render('posts/new');
});

// app.post('/articles', function(req, res) {
//   console.log(req.body.article);
//   articles.push(req.body.article);
//   res.redirect('/articles');
// });


app.listen(3000, function() {
  console.log('server started on localhost:3000');
});




