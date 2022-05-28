const Product = require("../models/product")
const router = require("express").Router()


//create
router.post('/', async (req,res) => {
   
    const newProduct =  new Product(req.body)
    try{
        const savedProduct =  await newProduct.save();
        res.status(201).json(savedProduct)
    }catch (err){
    res.status(500).json(err)
    }
})

//get a specific product
router.get("/search/:id", async (req, res) => {
    try {
      const product = await Product.findOne({id:req.params.id});
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //find all the products
  router.get("/", async (req, res) => {
    try {
        let products = await Product.find();      
        res.status(200).json(products);    
      }    
    catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports =  router