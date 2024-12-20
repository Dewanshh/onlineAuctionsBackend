// index.js (establish relationships here)
const { User } = require('./User');
const { Product } = require('./Products');
const { Customer } = require('./Customer');
const { Seller } = require('./Seller');
const { Bid } = require('./Bid');

const initModels = () => {
  // Define the relationships between models
  Product.hasMany(Bid, { foreignKey: 'productId' });
  Bid.belongsTo(Product, { foreignKey: 'productId' });

  // Add other relationships (example)
  // User.hasMany(Order, { foreignKey: 'userId' });

  // You can add more relationships as needed
};

module.exports = { initModels };
