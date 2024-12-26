

const express = require('express');
const { createSeller, fetchSeller } = require('../controllers/sellerController');
const router = express.Router();

router.post('/createSeller', createSeller);
router.get('/all', fetchSeller);

module.exports = router;
