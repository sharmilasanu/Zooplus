const router = require("express").Router()
const User = require("../models/user")
const CryptoJS= require("crypto-js")
const dotenv = require("dotenv")
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
        const password =  hashedPassword.toString(CryptoJS.enc.Utf8);
        password !== req.body.password && res.status(401).json("Password is incorrect")
        
        res.status(200).json(user);
    }catch (err){
    res.status(500).json(err)
    }
})


module.exports =  router