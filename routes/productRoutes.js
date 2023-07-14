const express = require('express');
const {
        getProducts,
        getProduct,
        uploadImage,
        createProduct,
        updateProduct,
        deleteProduct,
} = require('../controller/productController');

const router = express.router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/upload', uploadImage);

module.exports = router;