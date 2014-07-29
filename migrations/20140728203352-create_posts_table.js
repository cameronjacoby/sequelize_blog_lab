module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable('posts',
      {id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      authorId: {
        type: DataTypes.INTEGER,
        foriegnKey: true // fix spelling (should be'foreign') with another migration
      }
    })
    .complete(done)    
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished 
    migration.dropTable('posts')
      .complete(done)
  }
}