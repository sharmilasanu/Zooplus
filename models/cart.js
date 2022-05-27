const mongoose = require('mongoose');
 let cartSchema = new mongoose.Schema({
    userId: {type: String, required:true},
    products: [
      {
        productId : {
            type:String
        },
        quantity : {
            type: Number,
            default: 1
        }
      }
    ],
     },
     {timestamps:true }
  );
  
  let Cart = mongoose.model('Cart',cartSchema)
  module.exports.Cart = Cart;