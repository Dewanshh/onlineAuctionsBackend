const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');


const Product = sequelize.define('Product', {

  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Product title is required' },
      notEmpty: { msg: 'Product title cannot be empty' },
    },
  },

  sellerName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Seller name is required' },
      notEmpty: { msg: 'Seller name cannot be empty' },
    },
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Product city is required' },
      notEmpty: { msg: 'Product city cannot be empty' },
    },
  },

  minimumBid: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: { msg: 'Minimum bid is required' },
      isFloat: { msg: 'Minimum bid must be a number' },
    },
  },

  bidStartDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: { msg: 'Bid start date is required' },
      isDate: { msg: 'Bid start date must be a valid date' },
    },
  },

  productType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'Product type is required' },
      notEmpty: { msg: 'Product type cannot be empty' },
    },
  },

  productImage: {
    type:  DataTypes.BLOB('long'),
    allowNull: true,  
  },

  productDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notNull: { msg: 'Product description is required' },
      notEmpty: { msg: 'Product description cannot be empty' },
    },
  },
  winner: {
      type: DataTypes.JSON,  // Store winner details as a JSON object
      allowNull: true,
    },
}, {
  timestamps: true,  
  underscored: true,
});


module.exports = {Product};
