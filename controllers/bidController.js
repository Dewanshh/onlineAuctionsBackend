const Bid = require('../models/Bid');
const { Customer } = require('../models/Customer');

module.exports = {
  fetchBids: async (req, res) => {
    try {
      const { productId } = req.params;
      const bids = await Bid.findAll({
        where: { productId },
        order: [['createdAt', 'DESC']], 
      });
      res.status(200).json(bids);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bids', error });
    }
  },

  placeBid: async (req, res) => {
    try {
      const { productId, email, bidAmount } = req.body;

      if (!productId || !email || !bidAmount) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const user = await Customer.findOne({ where: { email: email } });

      const userName = user ? user.name : "Dummy";

      const highestBid = await Bid.findOne({
        where: { productId },
        order: [['bidAmount', 'DESC']], 
      });

      if (!highestBid) {
        const newBid = await Bid.create({ productId, userName, bidAmount });
        return res.status(201).json(newBid);
      }

      if (highestBid.userName === userName) {
        return res.status(400).json({
          message: 'You cannot bid again until someone else places a higher bid',
        });
      }

      if (bidAmount <= highestBid.bidAmount) {
        return res.status(400).json({
          message: `Your bid must be higher than the current highest bid of Rs. ${highestBid.bidAmount}`,
        });
      }

      const newBid = await Bid.create({ productId, userName, bidAmount });
      res.status(201).json(newBid);
    } catch (error) {
      res.status(500).json({ message: 'Error placing bid', error });
    }
  },
};
