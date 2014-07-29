function Post(sequelize, DataTypes){
  return sequelize.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
    // add foreign key
  });
};

module.exports = Post;