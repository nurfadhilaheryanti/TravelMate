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
      this.hasMany(models.Trip, { foreignKey: "userId" })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username must be filled'
        },
        notEmpty: {
          msg: 'Username must be filled'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique"
      },
      validate: {
        notNull: {
          msg: 'Email must be filled'
        },
        notEmpty: {
          msg: 'Email must be filled'
        },
        isEmail: {
          msg: "Invalid Email format"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password must be filled'
        },
        notEmpty: {
          msg: 'Password must be filled'
        }
      }
    },
    fullName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Full Name must be filled'
        },
        notEmpty: {
          msg: 'Full Name must be filled'
        }
      }
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Gender must be filled'
        },
        notEmpty: {
          msg: 'Gender must be filled'
        }
      }
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'DoB must be filled'
        },
        notEmpty: {
          msg: 'DoB must be filled'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hash(user.password)
  })
  return User;
};