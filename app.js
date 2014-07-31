var express = require('express'),
  db = require('./models/index'),
  ejs = require('ejs'),
  bodyParser = require('body-parser'),
  app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));


// renders home page (shows all blog posts)
app.get('/blog', function(req, res) {
  db.post.findAll().success(function(posts) {
    res.render('site/index', {posts: posts, authorName: ''});
  });
});


// renders 'add new post' page
app.get('/post/new', function(req, res) {
  res.render('posts/new');
});


// renders 'view post' page
app.get('/post/:id', function(req, res) {
  var postId = req.params.id;
  db.post.find(postId).success(function(foundPost) {
    res.render('posts/view_post', {post: foundPost});
  });
});


// renders 'show posts by author' page
app.get('/user/:id', function(req, res) {
  var userId = req.params.id;
  db.author.find(userId).success(function(author) {
    author.getPosts().success(function(associatedPosts) {
      console.log(associatedPosts);
      res.render('posts/posts_by_author', {posts: associatedPosts, author: author});
    });
  });
});


// renders signup page
app.get('/signup', function(req, res) {
  res.render('site/signup', {username: ''});
});


// renders login page
app.get('/login', function(req, res) {
  res.render('site/login', {username: ''});
});


// posts to homepage when new blog post is created
app.post('/blog', function(req, res) {
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




