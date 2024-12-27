
const { createProduct, getProducts, getProductById, deleteProductById } = require("../controllers/productController");
const express = require('express');
const router = express.Router();


router.post('/create', createProduct);
router.get('/all',getProducts);
router.get('/:id',getProductById);
router.delete('/:id',deleteProductById);

module.exports = router;
