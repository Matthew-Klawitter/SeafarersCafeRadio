'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.Mood);
      Song.belongsToMany(models.Playlist, {through: 'PlaylistSongs', foreignKey: 'songId'});
    }
  };
  Song.init({
    title: DataTypes.STRING,
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
    artist: DataTypes.STRING,
    source: DataTypes.STRING,
    moodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};