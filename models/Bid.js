// Bid.js (remove the associate method)
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Bid = sequelize.define('Bid', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'User email is required' },
      isEmail: { msg: 'Must be a valid email' },
    },
  },
  
  bidAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: { msg: 'Bid amount is required' },
      isFloat: { msg: 'Bid amount must be a number' },
    },
  },

  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'id',
    },
    allowNull: false,
    validate: {
      notNull: { msg: 'Product ID is required' },
    },
  },
}, {
  timestamps: true,
  underscored: true,
});

module.exports = { Bid };
