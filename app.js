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

app.get('/post/new', function(req, res) {
  res.render('posts/new');
});

app.get('/post/:id', function(req, res) {
  var postId = req.params.id;
  db.post.find(postId).success(function(foundPost) {
    res.render('posts/view', {post: foundPost});
  });
});

app.get('/user/:id', function(req, res) {
  var userId = req.params.id;
  db.author.find(userId).success(function(author) {
    author.getPosts().success(function(associatedPosts) {
      console.log(associatedPosts);
      res.render('posts/show', {posts: associatedPosts, author: author});
    });
  });
});

app.post('/blog', function(req, res) {
  console.log('this is the req.body');
  var username = req.body.author.username;
  var title = req.body.post.title;
  var content = req.body.post.content;

  db.author.findOrCreate({username: username}).success(function(author) {
    db.post.create({title: title, content: content, authorId: author.id}).success(function(post) {
      res.redirect('/blog');
    });
  });
});


app.listen(3000, function() {
  console.log('server started on localhost:3000');
});




