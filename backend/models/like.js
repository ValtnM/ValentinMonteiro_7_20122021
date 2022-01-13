'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        // hooks: true
        // as: 'user'
      });

      models.Like.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE',
        // hooks: true
        // as: 'post'
      });
    }
  };
  Like.init({
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
        references: {
        model: 'User',
        key: 'id'
      }
    },  
    postId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
        references: {
        model: 'Post',
        key: 'id'
      },
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};