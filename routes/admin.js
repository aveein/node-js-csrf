
const express = require('express');

const router = express.Router();
 
const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

router.get('/products',adminController.getProducts);

router.get('/add-product',isAuth,adminController.getAddProducts);

router.get('/edit-product/:id',isAuth,adminController.getEditProducts);

router.post('/add-product',isAuth,adminController.postProducts);

router.post('/update-product/:id',isAuth,adminController.updateProducts);

router.post('/delete-product/:id',isAuth,adminController.deleteProduct);

module.exports = router;
