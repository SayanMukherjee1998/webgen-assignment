const jwt = require("jsonwebtoken");
const flash = require('connect-flash')
const productModel = require("../model/productDetails");
//Rendering dashboard page
exports.dashboard = (req, res) => {
  const pager = req.query.page ? req.query.page : 1
    const options = {
        page: pager,
        limit: 3,
        collation: {
          locale: 'en',
        },
      };
      productModel.find({status : 1}, (err, data) =>{
        res.render("dashboard", {
          title: "Dashboard Page",
          message : req.flash('message') ,
          productData : data,
          
        });
      });
      };

      //paginate part
//   productModel.paginate({status : 1},options, (err, data) =>{
//     res.render("dashboard", {
//       title: "Dashboard Page",
//       productData : data,
//       pager : pager,
//       message : req.flash('message')
//     });
//   });
// };


// Rendering add product page
exports.addProduct = (req, res) => {
  res.render("addProduct", {
    title: "Add Product",
    error : req.flash('error')
  });
};

//Post add product page
exports.postAddProduct = (req, res) => {
  const userName = res.cookies;
   console.log(userName);
  const newProduct = new productModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price ,
    addByUser: req.body.addByUser,
  });
  newProduct
    .save()
    .then((result) => {
      console.log("Product added successfully.");
      req.flash('message','Product added successfully')
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      req.flash('error',"Product didn't added successfully " )
    });
};

//Rendering edit page
exports.edit = (req, res) => {
  const pid = req.params.p_id
  productModel.findById((pid),(err,data) =>{
    res.render('editProduct',{
      title : "Edit product",
      productData : data
    })
  })
};
//Update page
exports.update = (req, res) => {
  const pid = req.body.p_id
  productModel.findById(pid).then(result=>{
    result.name = req.body.name
    result.price = req.body.price 
    result.description = req.body.description
    result.updatedAt = Date.now()
    result.addByUser = req.body.addByUser

    return result.save().then(data=>{
      req.flash('message',"Product updated successfully")
      res.redirect('/')
    }).catch(err=>{
      console.log(err);
    })

  }).catch(err=>{
    console.log(err);
  })
};
//Delete product
exports.softDelete = (req, res) => {
  const pid = req.params.p_id
  productModel.findByIdAndUpdate({_id : pid},{status : 0},(err,data)=>{
    
      console.log("product deleted successfully");
      req.flash('message','Product deleted successfully')
      res.redirect('/')
    
  })
};

//User authentication
exports.userAuth = (req, res, next) => {
  if(req.user){
      next();
    
  }else {
     res.redirect('/login')
    
  }
};
