

const express = require('express');
const { fetchCustomers } = require('../controllers/customerController');
const router = express.Router();

router.get('/all',fetchCustomers);

module.exports = router;
