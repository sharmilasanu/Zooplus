const User = require("../models/user");
const router = require("express").Router()


//search all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
  });
//search user by id
  router.get("/search/:id", async (req, res) => {
    try {
      const user = await User.findOne({id:req.params.id});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //User delete
  router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findOneAndDelete({id:req.params.id});
      res.status(200).json("user been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.post("/",(req,res) => {
    const username = req.body.username;
    console.log(username);
})

module.exports =  router