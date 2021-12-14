const mongoose = require("mongoose");
const schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2')
const productDetails = new schema({
  name: {
      type : String,
      required : true
  },
  price : {
      type : String,
      required : true
  },
  description : {
      type : String,
      required : true
  },
  createdAt : {
      type : Date,
      required : true,
      default : Date.now
  },
  updatedAt : {
      type : Date,
      required : true,
      default : Date.now
  },
  addByUser : {
      type : String,
      required : true
  },
  status : {
      type : Number,
      required : true,
      default : 1
  }
});
productDetails.plugin(mongoosePaginate)
const productData = new mongoose.model('Product Data',productDetails)
module.exports = productData
