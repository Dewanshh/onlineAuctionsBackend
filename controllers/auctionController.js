const { Product } = require('../models/Products');
const { findAndUpdateWinner } = require('../services/winnerSerivce');

exports.checkWinner=async (req, res) => {
  try {  
    const products = await Product.findAll({
      where: {
        winner: null,
      },
    });

    for (const product of products) {

      const bidEndDate = moment(product.bidStartDate).add(1, 'hours');


      if (moment().isAfter(bidEndDate)) {

        await findAndUpdateWinner(product.id);
      }
    }

    res.status(200).json({ message: "Winner check completed." });
  } catch (error) {
    res.status(500).json({ message: "Error checking winners", error });
  }
};
