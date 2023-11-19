
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Cart = require('../models/cart');
const Order = require('../models/order');
// const { doubleCsrf } = require("csrf-csrf");
// const {
  
//   generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
 
//   } = doubleCsrf({  getSecret: () => "Secret", getTokenFromRequest: (req) => req.body["CSRFToken"]});

exports.getLogin = (req,res,next)=>{
        const token = req.csrfToken(true);
   
  
        res.render('auth/login',{
            docTitle:'Login',
            path:'/login',
            pageTitle:'login',
            token:token
        });
    

}

exports.getLogout = (req,res,next)=>{
        
    req.session.destroy();

    return res.redirect('/');

}

exports.getSignUp = (req,res,next)=>{
    
   
    // console.log(bcrypt.hash('avin@123',12).then(result=>bcrypt.compare('avin@123',result).then(res=>console.log(res))),);
    res.render('auth/sign-up',{
        docTitle:'Sign Up',
        path:'/sign-up',
        pageTitle:'Sign Up'
    });
    

}

exports.postSignUp = (req,res,next)=>{

    const email = req.body.email;
    const password = req.body.email;
    const confirm_password = req.body.confirm_password;
    
    bcrypt.hash(password,12).then(password=>{
        User.findOrCreate({
            where: { email: email },
            defaults:{
                name:'Admin',
                password: password,
            }
           
          })
    })
    
    res.redirect('back');


}

exports.postLogin = (req,res,next)=>{
    console.log('sdfsdf');
     const email = req.body.email;
     const password = req.body.password;
     
     User.findOne({where: {email:email}, include: [{model:Cart},{model:Order}] }).then(user=>{

        if(!user){ return res.redirect('/login')}

            bcrypt.compare(password, user.password).then((result) => {
                if(result === true){
                    req.session.user = user;
                    return req.session.save(err=>{
                        res.redirect('/');
                    });
                }else{
                    return res.redirect('back');
                }
              
                 
                // if(result === true){
                    
                // req.session.user = user;

                 
                // }
            })
        
     
        
    });
}