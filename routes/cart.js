const Cart = require("../models/cart");
const router = require("express").Router();

//CREATE

router.post("/",  async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});



//UPSERT
router.put("/:userId", async (req, res) => {
 
  try {
    const productObj = { 
     
      "productId": req.body.products.productId, 
      "productImage": req.body.products.productImage, 
      "productPrice": req.body.products.productPrice,
      "productTitle" : req.body.products.productTitle,
      "quantity" : req.body.products.quantity

    };
    const updatedCart = await Cart.findOneAndUpdate(
      req.params.userId,
      {
      $push:{products : productObj }
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;