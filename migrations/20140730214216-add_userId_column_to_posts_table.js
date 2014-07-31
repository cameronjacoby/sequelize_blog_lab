module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
      'posts',
      'userId',
      {
        type: DataTypes.INTEGER,
        foreignKey: true
      }
    )
    .complete(done);

  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeColumn('posts','authorId')
      .complete(done);
  }
};