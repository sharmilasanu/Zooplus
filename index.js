const express = require("express"),
      morgan = require("morgan"),
      mongoose = require("mongoose"),
      userRoute = require("./routes/user"),
      authRoute = require("./routes/auth"),
      productRoute = require("./routes/products"),
      cartRoute = require("./routes/cart"),
      cors = require('cors');
      const app = express();

const dotenv = require("dotenv");
dotenv.config();

let allowedOrigins = ['http://localhost:3000', 'https://zooplusecomm.herokuapp.com/'];
app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
})); 


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
app.use("/api/cart", cartRoute)

//Error handling Middleware
app.use((err,req,res, next) =>{
console.error(err);
res.status(500).send('Something Broke!');
});

app.listen(process.env.PORT || 3000,() => {
  console.log('Backend server is running');
});