

const express = require('express');
const { fetchCustomers } = require('../controllers/customerController');
const { getCustomer, changeAdminPassword, updateCustomer } = require('../controllers/authController');
const router = express.Router();

router.get('/all',fetchCustomers);
router.get("/:email",getCustomer);
router.put('/updateCustomer',updateCustomer);

module.exports = router;
