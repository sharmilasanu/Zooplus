const mongoose = require('mongoose');
 let cartSchema = new mongoose.Schema({
    userId: {type: String, required:true,unique:true },
    products: [
      {
        productId : { type: String,required:true,unique:true},
        productImage : {
          type:String
        },
        productPrice : {
          type:Number
        },
        productTitle : {
          type:String
        },
        quantity : {
            type: Number,
        }
      }
    ],
     },
     {timestamps:true }
  );
  
  module.exports = mongoose.model('Cart',cartSchema)