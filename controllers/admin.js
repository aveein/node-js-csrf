
const Product = require('../models/product');

exports.getProducts = (req,res,next)=>{
  
    const products = Product.findAll().then(products=>{
        res.render('admin/products',{prods:products,pageTitle:'Admin Products',path:'/admin/products'});
    }).catch(err=>{
        
    })
    // process.exit();
}

exports.getAddProducts = (req,res,next)=>{
    console.log('i am add product middleware');
    res.render('admin/add-product',{pageTitle:'Add Product',activeProduct:true,path:'/admin/add-product',editProduct:false});
}

exports.getEditProducts = (req,res,next)=>{

    // Product.findByPk(req.params.id)
    req.user.getProducts({
        where:{
            id:req.params.id
        }
    })
    .then(product=>{
        
        res.render('admin/add-product',{pageTitle:'Add Product',activeProduct:true,path:'/admin/add-product',product:product[0],editProduct:true});
    
    });

 
}

exports.postProducts = (req,res,next)=>{
   
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title:title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    }).then(result=>{
        console.log('Product Created!');
    }).catch(err =>{
        console.log(err);
    });
    // const product = Product.create({
    //     title:title,
    //     imageUrl: imageUrl,
    //     price: price,
    //     description: description,
    //     userId: req.user.id
    // }).then(result=>{
    //     console.log('Product Created!');
    // }).catch(err =>{
    //     console.log(err);
    // })

   
    // res.redirect('/');
    res.redirect('back');
}
exports.updateProducts = (req,res,next)=>{
    const id = req.params.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.update({
        title:title,
        imageUrl: imageUrl,
        price: price,
        description: description
    },{
        where:{
            id:id
        }
    });
    // const product = new Product(title,imageUrl,price,description);
    // product.update(id);

    res.redirect('back');
}

exports.deleteProduct = (req,res,next)=>{
 
    Product.destroy({
        where: {
          id: req.params.id
        }
      });;
   

    res.redirect('back');
}