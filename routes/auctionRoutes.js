const express=require('express');
const router=express.Router()
const { checkWinner } = require('../controllers/auctionController');


router.post('/check-winners',checkWinner);

module.exports = router;
