const dotenv = require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const errorHandler = require("./middleware/errorMiddleware");
const fileUpload = require("express-fileupload")

const app = express();


// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

app.use(
   cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
   })
);
app.use(errorHandler);
// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/order" ,orderRoute)
app.use(fileUpload({
   useTempFiles: true
}))

app.get("/", (req, res) => {
   res.send("Home page...");
});

// Error middleware


const PORT = process.env.PORT || 8000;

mongoose
   .connect(process.env.MONGO_URL, {
      
   })
   .then(() => {


      app.listen(PORT, () => {
         console.log(`SERVER IS RUNNING IN ${PORT}`);
      });
   })
   .catch((err) => {
      console.error("MongoDB connection error:", err);
   });
