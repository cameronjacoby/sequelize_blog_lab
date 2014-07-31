function Post(sequelize, DataTypes) {
  return sequelize.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    }
  });
}

module.exports = Post;