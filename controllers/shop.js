const Cart = require('../models/cart');
const Order = require('../models/order');
const OrderItems = require('../models/order-item');
const Product = require('../models/product');


exports.getIndex = (req,res,next)=>{
    const products = Product.findAll().then(products=>{
        res.render('shop/index',{prods:products,pageTitle:'Shop',activeShop:true,path:'/'});
    }).catch(err=>{

    })
    // process.exit();
}


exports.getProducts = (req,res,next)=>{

    const products = Product.findAll().then(products=>{
        res.render('shop/product-list',{prods:products,pageTitle:'Shop',activeShop:true,path:'/products'});
    }).catch(err=>{
        
    })
   
    // process.exit();
}

exports.getProduct = (req,res,next)=>{
    const prodId = req.params.id;

    Product.findByPk(  prodId).then(product=>{
        
            res.render('shop/product-detail',{
                product:product,
                pageTitle:'Shop',
                path:'/products'
            });
        
    });

   
    // process.exit();
}

exports.getCarts = (req,res,next)=>{
    req.user.getCart().then(cart=>{
        return cart.getProducts().then(product=>{
      
        res.render('shop/cart',{
                carts: product,
                pageTitle:'Cart',
                path:'/cart'
            });
        }).catch(err=>console.log(err));
    }).catch(err=>console.log(err));
  
    // const carts = Cart.getProducts(cart=>{

    //     let cartProducts = [];
    //     Product.fetchAll(products => {
      
    //         for(let product of  products){
                
    //             let cartProductData = cart.products.find((prod)=> prod.id === product.id);
           
                
    //             if(cartProductData){

    //                 cartProducts.push({ productData: product ,qty: cartProductData.qty  });
    //             }
    //         }
            
    //         res.render('shop/cart',{
    //             carts: cartProducts,
    //             pageTitle:'Cart',
    //             path:'/cart'
    //         });
    //     });
    // });

    

   

}

exports.postCart = (req,res,next)=>{

    const prodId = req.body.product_id;
   
    req.user.getCart().then(cart=>{
        
       cart.getProducts({where: {id:prodId}}).then(cart_products=>{
           
            if(cart_products.length > 0){
                const product = cart_products[0];
                let oldQuantity = product.cartItems.quantity;
                product.cartItems.quantity = oldQuantity + 1 ;
                product.cartItems.save();
            }else{
               return Product.findByPk(prodId).then(product=>{

                   return cart.addProduct(product,{
                        through:{
                            quantity:1
                        }
                    })
                }).catch(err=>console.log(err));
              
            }
       }).catch(err=>console.log(err));
        
      

    }).catch(err=>console.log(err));;
    
   
    // res.redirect('/cart');
    res.redirect('back');

}

exports.deleteCart = (req,res,next)=>{

    const prodId = req.body.product_id;
    req.user.getCart().then(cart=>{
        return cart.getProducts({where: {id:prodId}});
        

    }).then(cart_product=>{
        cart_product[0].cartItems.destroy();
        // cart_product.removeCartItems(prodId);
    });
    console.log('req',prodId);

    res.redirect('/cart');

}

exports.getOrders = (req,res,next)=>{
     
    req.user.getOrders({ include: [{
        model: Product,
      
      }]}).then(orders=>{

        res.render('shop/orders',{
            pageTitle:'Orders',
            path:'/orders',
            orders:orders
        });
    }).catch(err=>console.log(err))
    

}

exports.getCheckout = (req,res,next)=>{
    req.user.getOrders().then(orders=>{
        res.render('shop/checkout',{
            docTitle:'Checkout',
            path:'/checkout',
            orders:orders
        });
    }).catch(err=>console.log(err))
    

}

exports.postCheckout = (req,res,next)=>{

    let fetchCart;
   req.user.getCart().then(cart=>{
        fetchCart = cart;
        cart.getProducts().then(cart_product=>{
            // let order = null;
            if(cart_product){
            //    Order.findOne({
            //         where:{
            //             userId:req.user.id
            //         }
            //     }).then(order_user=>{
            //         if(order_user){
            //             order = order_user;
            //         }else{
            //             order = req.user.createOrder({
            //                 quantity: 1
            //             });
            //         }
            //     })
               
                return req.user.createOrder({
                            quantity: cart.quantity
                }).then(order=>{
                //      cart_product.forEach(element => {
                    
                //     let product = Product.findByPk(element.id).then(product=>{

                //         console.log(order.addProduct(product, { through: { quantity: element.cartItems.quantity } }));
                //     });
                   

                  
                
                //  });
                return order.addProduct(
                    cart_product.map(product=>{
                        product.orderItems={
                            quantity: product.cartItems.quantity
                        }
                        console.log('sdfsdfsdf',product);
                        return product;
                    })
                );
                });

              

                 


            }
          
        })
   }).then(result=>{
    fetchCart.setProducts(null);
   }).catch(err=>{
        console.log(err);
   })
   res.redirect('orders');

}