const express = require("express"),
      morgan = require("morgan"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      dotenv = require("dotenv")
      dotenv.config(),
      userRoute = require("./routes/user"),
      authRoute = require("./routes/auth")
      const app = express();

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Database Connection Successful"))
.catch(err => console.log(err));
  

app.get('/', (req,res) => {
  res.send("welcome to Zooplus Ecommerce API")
})

//gets all the users
app.get('/users', (req, res) => {
  Users.find()
    .then((user) => {
      res.status(201).json(user);
      console.log("fetch success")
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.use(express.json())
app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)


//Error handling Middleware
app.use((err,req,res, next) =>{
console.error(err,stack);
res.status(500).send('Something Broke!');
});

app.listen(process.env.PORT || 3000,() => {
  console.log('Backend server is running');
});