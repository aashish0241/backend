const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dkrarj6gn',
  api_key: '416182517694345',
  api_secret: 'VdVvt3n5lf21t1Bi_dHo0GChYTU'
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const createProduct = asyncHandler(async (req, res) => {

  const {
    name,
    brand,
    sku,
    category,
    quantity,
    price,
    description,
    regularPrice,
    color,
    image
  } = req.body;

  // Assuming you are using multer for file uploads
  // const file = req.files.image;

  // if (!file) {
  //   res.status(400);
  //   throw new Error("Please provide an image");
  // }

  // cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
  //   if (err) {
  //     console.error('Error uploading image to Cloudinary:', err);
  //     res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
  //   } else {
  //     console.log('Image uploaded successfully:', result);

  //     // Create the product after image upload
      const product = await Product.create({
        name,
        brand,
        sku,
        category,
        quantity,
        price,
        description,
        regularPrice,
        color,
        image,
        // image: result.secure_url, // Assuming you want to store the image URL in the product
      });

      res.status(201).json(product);
    }
  );
//get products
const getProducts =asyncHandler(async(req, res) =>{
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products);

})
//get single product
const getProduct =asyncHandler(async(req, res) =>{
  const product = await Product.findById(req.params.id);
  if(!product)
  {
    res.status(400);
    throw new Error("product not fopund");
  }
  res.status(200).json(product);

})
//delet product
const deleteProduct =asyncHandler(async(req, res) =>{
  const product = await Product.findById(req.params.id);
  if(!product)
  {
    res.status(400);
    throw new Error("product not found");
  }
  
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({message:"product delete scucessfully"})

})
//update product
const updateProduct = asyncHandler(async (req, res) => {
  const { 
    name,
    brand,
    category,
    quantity,
    price,
    description,
    image,
    regularPrice,
    color,
  } = req.body;

  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      brand,
      category,
      quantity,
      price,
      description,
      image,
      regularPrice,
      color,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});
//review of the product 
const reviewProduct = asyncHandler(async(req, res)=>{
  const {star , review, reviewDate}= req.body
  const {id}= req.params
  //validation of review
  if(star<1 || !review)
  { res.status(400);
    throw new Error("please add review ");

  }
  const product = await Product.findById(id);
  if(!product)
  {
    res.status(400);
    throw new Error("product not found")
  }
  //updare rating 
  product.ratings.push({
    star, review,
    reviewDate, 
    name:req.user.name,
    userID: req.user._id,
  }),
  product.save()
  res.status(200)({message:"product review is done"})

})
//delete review
 const deleteReview = asyncHandler(async(req, res)=>{
  const {userID}= req.body
  const product = await Product.findById(id);
  if(!product)
  {
    res.status(400);
    throw new Error("product not found")
  }

  const newRatings =product.ratings.filter((ratings)=>{
    return rating.userID.toString()!== userID.toString()
  })
  product.ratings = newRatings
  product.save()
  res.status(200)({message:"product review  updated done"})
 })
module.exports = {
  updateProduct,
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview
};

