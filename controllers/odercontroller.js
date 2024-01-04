const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel.js");

const createOrder = asyncHandler(async (req, res) => {
  const { 
    name,
    address,
    message,
    contact,
    payment
  } = req.body;
//   || !address  || !message|| !contact || !payment 
  if(!name )
  {
    res.send(400);
    throw new Error("plesae fill required filed");
  }


   const product = await  Order.create({
    name,
    address,
    message,
    contact,
    payment
   })
  res.status(201).json(product);
});

//get products
const getOrders =asyncHandler(async(req, res) =>{
  const order = await Order.find().sort("-createdAt");
  res.status(200).json(order);

})

// })
//delet product
const deleteOrder =asyncHandler(async(req, res) =>{
  const order = await Order.findById(req.params.id);
  if(!order)
  {
    res.status(400);
    throw new Error("Order not found");
  }
  
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({message:"Order delete scucessfully"})

})
// //update product
// const updateProduct = asyncHandler(async (req, res) => {
//   const { 
//     name,
//     brand,
//     category,
//     quantity,
//     price,
//     description,
//     image,
//     regularPrice,
//     color,
//   } = req.body;

//   const product = await Product.findById(req.params.id);
  
//   if (!product) {
//     res.status(400);
//     throw new Error("Product not found");
//   }

//   const updatedProduct = await Product.findByIdAndUpdate(
//     req.params.id,
//     {
//       name,
//       brand,
//       category,
//       quantity,
//       price,
//       description,
//       image,
//       regularPrice,
//       color,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).json(updatedProduct);
// });
// //review of the product 
// const reviewProduct = asyncHandler(async(req, res)=>{
//   const {star , review, reviewDate}= req.body
//   const {id}= req.params
//   //validation of review
//   if(star<1 || !review)
//   { res.status(400);
//     throw new Error("please add review ");

//   }
//   const product = await Product.findById(id);
//   if(!product)
//   {
//     res.status(400);
//     throw new Error("product not found")
//   }
//   //updare rating 
//   product.ratings.push({
//     star, review,
//     reviewDate, 
//     name:req.user.name,
//     userID: req.user._id,
//   }),
//   product.save()
//   res.status(200)({message:"product review is done"})

// })
// //delete review
//  const deleteReview = asyncHandler(async(req, res)=>{
//   const {userID}= req.body
//   const product = await Product.findById(id);
//   if(!product)
//   {
//     res.status(400);
//     throw new Error("product not found")
//   }

//   const newRatings =product.ratings.filter((ratings)=>{
//     return rating.userID.toString()!== userID.toString()
//   })
//   product.ratings = newRatings
//   product.save()
//   res.status(200)({message:"product review  updated done"})
//  })
// module.exports = {
//   updateProduct,
// };

module.exports = {
                  createOrder,
                  getOrders,
                  deleteOrder
//   createProduct,
//   getProducts,
//   getProduct,
//   deleteProduct,
//   updateProduct,
//   reviewProduct,
//   deleteReview
};

