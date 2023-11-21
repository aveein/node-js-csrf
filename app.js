const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pageNotFoundController = require('./controllers/404');

const Product = require('./models/product');
const User = require('./models/user');

const app = express();

var cookieParser = require('cookie-parser')
const session = require('express-session');
const sessionStore = require('./utils/session');
const { doubleCsrf } = require("csrf-csrf");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

// Register `hbs.engine` with the Express app.

app.use(cookieParser());
const {
    invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
    generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
    validateRequest, // Also a convenience if you plan on making your own middleware.
    doubleCsrfProtection, // This is the default CSRF protection middleware.
  } = doubleCsrf({
    getSecret: () => "Secret", // A function that optionally takes the request and returns a secret
    cookieName: "psifi.x-csrf-token", //this is for http and add __Host for development put it in a .env file for solving conflict in dev 
    cookieOptions: {
      
        secure : false,
     
      },
   // A function that returns the token from the request
   getTokenFromRequest: (req) => {
    
    const contentType = req.headers['content-type'];
    if (contentType.includes('form')) {
        return req.body['CSRFToken'];
    } else {
        return req.headers['x-csrf-token'];
    }
  },
  });

app.use(doubleCsrfProtection);
  
app.set('view engine', 'ejs');
app.set('views','views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const sequelize = require('./utils/database');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');



    
// parse application/x-www-form-urlencoded

// parse application/json


app.use((req,res,next)=>{
    
    User.findByPk(1).then(user=>{
       
        req.user = user;
        next();
    }).catch(err=> console.log(err));
    
   
});

app.use('/admin',adminRoutes);

app.use(shopRoutes);

app.use(authRoutes);

app.use(express.static(path.join(__dirname,'public')));

app.use(pageNotFoundController.pageNotFound);



Product.belongsTo(User,{constraints: true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{
    through: CartItem
});
Product.belongsToMany(Cart,{
    through:CartItem
});
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product,{
    through:OrderItem
});

Product.belongsToMany(Order,{
    through:OrderItem
});

sequelize
// .sync({force:true})
// .sync({ alter: true })
.sync()
.then(result=>{
   
    return User.findByPk(1);
})
.then(user=>{
    if(!user){
        User.create({
            'name':'Admin',
            'email':'admin@gmail.com'
        });
    }

    return user;
})
.then(user => {
    
    if(user.getCart().then(cart=>{
        if(!cart){
            return user.createCart({
                quantity: 1
            });
            
        }else{
            return cart;
        }
    }));
   
}).then(cart=>{
    app.listen(3000);

})
.catch(err => {
    console.log('sdfsdf'.err);
});






