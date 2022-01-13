'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Post);

      models.User.belongsToMany(models.Post, {
        onDelete: 'CASCADE',
        through: models.Like,
        foreignKey: 'userId',
        otherKey: 'postId'
      });

      models.User.belongsToMany(models.Post, {
        onDelete: 'CASCADE',
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'postId'
      });
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    photo: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};