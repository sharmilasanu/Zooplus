const mongoose = require('mongoose');
 let orderSchema = new mongoose.Schema({
    userId: {type: String, required:true},
    products: [
      {
        productId : {
            type:String
        },
        quantity : {
            type: Number,
        }
      }
    ],
    amount : {type:Number,required:true},
    address:{type:Object,required:true},
    status: {type:String,default:"Pending"}
     },
     {timestamps:true }
  );
  
  let Order = mongoose.model('Order',orderSchema)
  module.exports.Order = Order;