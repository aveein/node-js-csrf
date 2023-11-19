const express = require('express');


const router = express.Router();



const shopController = require('../controllers/shop');


router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:id',shopController.getProduct);

router.get('/cart',shopController.getCarts);

router.post('/cart',shopController.postCart);

router.post('/cart/delete',shopController.deleteCart);

router.get('/orders',shopController.getOrders);

router.get('/checkout',shopController.getCarts);



router.post('/checkout',shopController.postCheckout);


module.exports = router;