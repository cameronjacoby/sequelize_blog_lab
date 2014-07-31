var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var passport = require('passport');
var passportLocal = require('passport-local');

function User(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notNull: false,
        len: [6, 30]
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  },
    {
      classMethods: {
        // encrypt a password
        encryptPass: function(password) {
          var hash = bcrypt.hashSync(password, salt);
          return hash;
        },
        // compare a password
        comparePass: function(userpass, dbpass) {
          return bcrypt.compareSync(userpass, dbpass);
        },
        // create a new user
        createNewUser: function(username, password, err, success) {
          if (password.length < 6) {
            err({message: 'Your password should be more than 6 characters.'});
          }
          else {
            User.create({
              username: username,
              password: User.encryptPass(password)
            }).error(function(error) {
              console.log(error);
              if (error.username) {
                err({message: 'Your username should be at least 6 characters.'});
              }
              else {
                err({message: 'An account with that username already exists.'});
              }
            }).success(function(user) {
              success({message: 'Successfully signed up! Now you can add a new blog post.'});
            });
          }
        },
        // authorize a user
        authorizeUser: function(username, password, err, success) {
          User.find({
            where: {
              username: username
            }
          })
          // when that's done...
          .done(function(error, user) {
            if (error) {
              console.log(error);
              err({message: 'Oops! Something went wrong on our end.'});
            }
            else if (user === null) {
              err({message: 'Username does not exist.'});
            }
            else if (User.comparePass(password, user.password) === true) {
              success();
            }
            else {
              err({message: 'Invalid password.'});
            }
          });
        }
      }
    });
  return User;
}

module.exports = User;




