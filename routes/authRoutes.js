const express = require('express');
const {loginUser,registerUser, registerCustomer, getCustomer, changeAdminPassword, changeCustomerPassword} = require('../controllers/authController');

const router = express.Router();


router.post('/login', loginUser);
router.post("/register", registerUser);
router.post("/registerCustomer",registerCustomer);
router.post('/changeAdminPassword',changeAdminPassword);
router.post('/changeCustomerPassword',changeCustomerPassword);


module.exports = router;
