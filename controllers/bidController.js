const {Bid} = require('../models/Bid');
const { Customer } = require('../models/Customer');
const {Product} = require('../models/Products');


module.exports = {
  fetchBids: async (req, res) => { 
    try {
      const { productId } = req.params;
      const bids = await Bid.findAll({
        where: { productId:productId },
        order: [['createdAt', 'DESC']], 
      });
      // console.log(bids)
      res.status(200).json(bids);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bids',error:error});
    }
  },

  placeBid: async (req, res) => {
    try {
      const { productId, email, bidAmount } = req.body;

      if (!productId || !email || !bidAmount) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const product=await Product.findByPk(productId);

      if(bidAmount<product.minimumBid)
      {
        return res.status(400).json({
          message:"Bid Should be greater than the minimum bid amount"
        })
      }
      const highestBid = await Bid.findOne({
        where: { productId },
        order: [['createdAt', 'DESC']],
      });

      if (highestBid && highestBid.userEmail === email) {
        return res.status(400).json({
          message: 'You cannot bid again until someone else places a higher bid',
        });
      }

      if (highestBid && bidAmount <= highestBid.bidAmount) {
        return res.status(400).json({
          message: `Your bid must be higher than the current highest bid of Rs. ${highestBid.bidAmount}`,
        });
      }

      const newBid = await Bid.create({ productId, userEmail: email, bidAmount });

      const customer = await Customer.findOne({ where: { email } });
      if (customer) {

        const customerBids = customer.customerBids
          ? JSON.parse(customer.customerBids)
          : [];


        if (!customerBids.includes(productId.toString())) {
          customerBids.push(productId.toString());
          customer.customerBids = JSON.stringify(customerBids); 
          await customer.save();
        }
      }

      res.status(201).json(newBid);
    } catch (error) {
      res.status(500).json({ message: 'Error placing bid', error });
    }
  },
};
