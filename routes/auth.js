const router = require("express").Router(),
 User = require("../models/user"),
 CryptoJS= require("crypto-js"),
 dotenv = require("dotenv"),
 jwt = require("jsonwebtoken");

dotenv.config(),

router.post('/register', async (req,res) => {
   
    const newUser = new User({
        username : req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPT_SECRET_KEY).toString(),
        email : req.body.email
    })
    try{
        const savedUser =  await newUser.save();
        res.status(201).json(savedUser)
    }catch (err){
    res.status(500).json(err)
    }
})

router.post('/login', async (req,res) => {
    try{
        const user =  await User.findOne({
            username: req.body.username  
        });
        !user && res.status(401).json("Username is Incorrect")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPT_SECRET_KEY)
        const originalPassword =  hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json("Password is incorrect")
        const accessToken = jwt.sign(
            {
              id: user._id
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"}
          );
          const { password, ...others } = user._doc;
          res.status(200).json({...others, accessToken});
    }catch (err){
    res.status(500).json(err)
    }
})


module.exports =  router