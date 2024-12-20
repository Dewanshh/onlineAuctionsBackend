const { Product } = require('../models/Products');
const { Bid } = require('../models/Bid');
const moment = require('moment');

const findAndUpdateWinner = async (productId) => {
  try {

    const product = await Product.findByPk(productId);
    
    if (!product) {
      console.log("Product not found.");
      return;
    }


    const bidStartDate = moment(product.bidStartDate);
    const bidEndDate = bidStartDate.add(1, 'hours');  
    
    const now = moment();
  

    if (now.isBefore(bidEndDate)) {
      console.log("The bidding period is still ongoing.");
      return;
    }


    const bids = await Bid.findAll({
      where: { productId },
      order: [['createdAt', 'DESC']],
    });

    if (bids.length === 0) {
      console.log("No bids placed.");
      return;
    }


    const highestBid = bids[0];


    await product.update({
      winner: {
        userEmail: highestBid.userEmail,
        bidAmount: highestBid.bidAmount,
      },
    });

    console.log(`Winner updated: ${highestBid.userEmail} with bid amount: ${highestBid.bidAmount}`);
  } catch (error) {
    console.error("Error finding and updating the winner:", error);
  }
};

module.exports = { findAndUpdateWinner };
