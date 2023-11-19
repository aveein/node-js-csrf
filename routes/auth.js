const express = require('express');



const router = express.Router();

  
const authController = require('../controllers/auth');


router.get('/login',authController.getLogin);

router.get('/logout',authController.getLogout);

router.post('/login',authController.postLogin);

router.get('/sign-up',authController.getSignUp);

router.post('/sign-up',authController.postSignUp);


module.exports = router;