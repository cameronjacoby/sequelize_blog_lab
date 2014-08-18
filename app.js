var express = require('express'),
  ejs = require('ejs'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  passportLocal = require('passport-local'),
  app = express(),
  db = require('./models/index');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));


// renders home page (shows all blog posts)
app.get('/blog', function(req, res) {
  var entries = {};
  db.post.findAll().success(function(posts) {
    db.user.findAll().success(function(users) {
      res.render('site/index', {posts: posts, users: users});
    });
  });
});


// renders 'view post' page
app.get('/post/:id', function(req, res) {
  var postId = req.params.id;
  db.post.find(postId).success(function(foundPost) {
    db.user.find(foundPost.userId).success(function(foundUser) {
      res.render('posts/view_post', {post: foundPost, user: foundUser.dataValues});
    });
  });
});


// renders 'show posts by user' page
app.get('/user/:id', function(req, res) {
  var userId = req.params.id;
  db.user.find(userId).success(function(user) {
    user.getPosts().success(function(associatedPosts) {
      res.render('posts/posts_by_user', {posts: associatedPosts, user: user});
    });
  });
});


// renders signup page
app.get('/signup', function(req, res) {
  res.render('site/signup', {username: '', message: ''});
});


// renders login page
app.get('/login', function(req, res) {
  res.render('site/login', {username: '', message: ''});
});


// posts to homepage when new blog post is created
app.post('/blog', function(req, res) {
  var username = req.body.user.username;
  var title = req.body.post.title;
  var content = req.body.post.content;
  db.user.find({where: {username: username}}).success(function(user) {
    db.post.create({title: title, content: content}).success(function(newPost) {
      user.addPost(newPost).success(function() {
        res.redirect('/blog');
      });
    });
  });
});


// sign up & render 'new post' page
app.post('/signup', function(req, res) {
  newUsername = req.body.username;
  newPassword = req.body.password;
  db.user.createNewUser(newUsername, newPassword,
    function(err) {
      res.render('site/signup', {message: err.message, username: newUsername});
    },
    function(success) {
      res.render('posts/new', {message: success.message});
    }
  );
});


// log in & render 'new post' page
app.post('/login', function(req, res) {
  enteredUsername = req.body.username;
  enteredPassword = req.body.password;
  db.user.authorizeUser(enteredUsername, enteredPassword,
    function(err) {
      res.render('site/login', {message: err.message, username: enteredUsername});
    },
    function(success) {
      res.render('posts/new', {message: 'Successfully signed in! You can now add a new blog post.'});
    }
  );
});


app.listen(3000, function() {
  console.log('server started on localhost:3000');
});