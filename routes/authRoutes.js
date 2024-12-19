const express = require('express');
const {loginUser,registerUser, registerCustomer} = require('../controllers/authController');

const router = express.Router();


router.post('/login', loginUser);
router.post("/register", registerUser);
router.post("/registerCustomer",registerCustomer);

module.exports = router;
