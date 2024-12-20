
const { createProduct, getProducts, getProductById } = require("../controllers/productController");
const express = require('express');
const router = express.Router();


router.post('/create', createProduct);
router.get('/all',getProducts);
router.get('/:id',getProductById);

module.exports = router;
