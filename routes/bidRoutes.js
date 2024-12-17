const express = require('express');
const bidController = require('../controllers/bidController');

const router = express.Router();

router.get('/:productId', bidController.fetchBids);

router.post('/', bidController.placeBid);

module.exports = router;

