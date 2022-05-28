const express = require("express"),
      morgan = require("morgan"),
      mongoose = require("mongoose"),
      userRoute = require("./routes/user"),
      authRoute = require("./routes/auth"),
      productRoute = require("./routes/products")
      const app = express();
const dotenv = require("dotenv");
dotenv.config()
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Database Connection Successful"))
.catch(err => console.log(err));
  

app.get('/', (req,res) => {
  res.send("welcome to Zooplus Ecommerce API")
})

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/users", userRoute)



//Error handling Middleware
app.use((err,req,res, next) =>{
console.error(err,stack);
res.status(500).send('Something Broke!');
});

app.listen(process.env.PORT || 3000,() => {
  console.log('Backend server is running');
});