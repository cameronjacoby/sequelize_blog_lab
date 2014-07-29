var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , env       = process.env.NODE_ENV || 'development'
  , config    = require(__dirname + '/../config/config.json')[env]
  , sequelize = new Sequelize(config.database, config.username, config.password, config)
  , db        = {}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.author.hasMany(db.post);
db.post.belongsTo(db.author);

// db.author.create({username: 'cameronjacoby'}).success(function(author) {
//   console.log(author);
// });

// db.post.create({title: 'First Post', content: 'This is the first blog post.', 
//   authorId: 1}).success(function(post) {
//     console.log(post);
// });

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db)




