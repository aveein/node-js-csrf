exports.pageNotFound = (req,res,next)=>{
    res.render('404',{pageTitle:'404 Not Found',path:'404'});
}

