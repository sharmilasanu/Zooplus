const router = require("express").Router()

router.get("/",(req,res)=> {
    res.send("user test is successful")
})

router.post("/",(req,res) => {
    const username = req.body.username;
    console.log(username);
})

module.exports =  router