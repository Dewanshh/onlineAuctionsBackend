const cron = require('node-cron');
const { Product } = require('../models/Products');
const { findAndUpdateWinner } = require('../services/winnerSerivce');
const moment = require('moment');


const startCronJob = () => {
    cron.schedule('* * * * *', async () => {
      try {
        console.log("Checking for winners...");
  
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
      } catch (error) {
        console.error("Error in cron job to check for winners:", error);
      }
    });
  };
  
  module.exports = { startCronJob };