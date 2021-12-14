const jwt = require("jsonwebtoken");
const flash = require("connect-flash");
const productModel = require("../../model/productDetails");
const { json } = require("body-parser");
//Rendering dashboard page
exports.dashboard = (req, res) => {
 
  productModel.find({ status: 1 }, (err, data) => {
    res.send(data)
  });
};



// Rendering add product page
exports.addProduct = (req, res) => {
  res.render("addProduct", {
    title: "Add Product",
  });
};

//Post add product page
exports.postAddProduct = (req, res) => {
console.log(req.body);
 
  productModel
    .create(req.body)
    .then((result) => {
     res.json({success : true , data :result})
    })
    .catch((err) => {
      res.json({success : false , msg :err})
      });
};

//Rendering edit page
exports.edit = (req, res) => {
  const pid = req.params.p_id;
  productModel.findById(pid, (err, data) => {
    res.send(data)
  });
};
//Update page
exports.update = (req, res) => {
  const pid = req.body.p_id;
  productModel
    .findById(pid)
    .then((result) => {
      result.name = req.body.name;
      result.price = req.body.price;
      result.description = req.body.description;
      result.updatedAt = Date.now();
      result.addByUser = req.body.addByUser;

      return result
        .save()
        .then((data) => {
          res.send(data)
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
//Delete product
exports.softDelete = (req, res) => {
  const pid = req.params.p_id;
  productModel.findByIdAndUpdate({ _id: pid }, { status: 0 }, (err, data) => {
    console.log("product deleted successfully");
    res.redirect("/");
  });
};

