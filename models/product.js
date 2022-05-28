const mongoose = require('mongoose');


  let productSchema = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String ,required:true},
    imageUrl:{type:String,required:true},
    category:{type:Array},
    price:{type:Number,required:true},
    size:{type:String},


     },
     {timestamps:true }
  );
  
  module.exports = mongoose.model('Products',productSchema)