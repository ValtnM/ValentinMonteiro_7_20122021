'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: 'userId',
        allowNull: false
      });

      models.Post.belongsToMany(models.User, {
        onDelete: 'CASCADE',
        through: models.Like,
        foreignKey: 'postId',
        otherKey: 'userId'
      });

      models.Post.belongsToMany(models.User, {
        onDelete: 'CASCADE',
        through: models.Comment,
        foreignKey: 'postId',
        otherKey: 'userId',
        // hooks: true
    });
    }
  };
  Post.init({
    textContent: DataTypes.STRING,
    imageContent: DataTypes.STRING,
    like: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};