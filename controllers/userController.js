const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Register the users
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   console.log('Name:', name);
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Request Body:', req.body);

   // Validation of request
   if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all the required fields");
      
   }
   if (password.length < 8) {
      res.status(400);
      throw new Error("Please enter a password with more than 8 characters");
   }

   // Check if email exists
   const existingUser = await User.findOne({ email });
   if (existingUser) {
     return res.status(409).json({ error: 'Email already registered' });
   }
   // Create user
   const newUser = await User.create({
      name,
      email,
      password,
   });

   // Generate token
   const token = generateToken(newUser._id);

   if (newUser) {
      const { _id, name, email, role } = newUser;

      // Set cookie
      res.cookie("token", token, {
         path: "/",
         httpOnly: true,
         expires: new Date(Date.now() + 1000 * 86400),
         // secure: true,
         // samesite: NamedNodeMap,
      });

      // Send user data
      res.status(201).json({
         _id,
         name,
         email,
         role,
         token,
      });
   } else {
      res.status(400);
      throw new Error("Invalid user data");
   }
});

const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
   });
};
 //login for the user
 const loginUser = asyncHandler(async (req, res) =>{
                  const { email , password} = req.body;
                  if(!email || !password)
                  {
                  res.status(400);
                  throw new Error(" Please enter vaild email or Password")
                  }
                  // check if users is exists ore not 
                  const user = await User.findOne({email});
                  if(!user){
                                    res.status(400)
                                    throw new Error(" User doesnot exists")
                  }

                  //check password
                  const passwordIsCorrect = await bcrypt.compare(password, user.password);


                  //generate token 
                  const token = generateToken(user._id);
                  if(user && passwordIsCorrect){
                                    const newUser = await User.findOne({email}).select("-password");
                                    res.cookie("token", token, {
                                       path: "/",
                                       httpOnly: true,
                                       expires: new Date(Date.now() + 1000 * 86400),
                                       // secure: true,
                                       // samesite: NamedNodeMap,
                                    });
                              
                                    // Send user data
                                    res.status(201).json(newUser);
                                    
                                    res.send("login sccess");
                  }
                  else{
                                    res.status(400);
                                    throw new Error(" please check your mail and passoword");
                  }
                  
                 

 });
 //logout the users
  const logout = asyncHandler(async(req, res) => {
                  res.send("logout scessfully")
                  res.cookie("token", "", {
                                    path: "/",
                                    httpOnly: true,
                                    expires: new Date(0),
                                    // secure: true,
                                    // samesite: NamedNodeMap,
                                 });
                                 return res.status(200).json({
                                    message: "sucessfuly Logout"
                                 })
  });
//   get user 
const getUser = asyncHandler(async(req, res) =>{
                  const user = await User.findById(req.user.id).select("-password");

                  if(user)
                  {
                                   res.status(200).json(user); 
                  }
                  else{
                                    res.status(400)
                                    throw new Error("user not found")
                  }
})
//get login  status
const getLoginStatus = asyncHandler (async(req , res) =>{
                  const token = req.cookies.token;
                  if(!token)
                  {
                               return     res.json(false)
                  }
                  const  verfied = jwt.verify(token, process.env.JWT_SECRET);
                  if(verfied)
                  {
                                    res.json(true);
                  }
                  else{
                                    res.json(false)
                  }

})
//update user
const updateUser = asyncHandler(async(req, res)=>{
                  const user = await User.findById(req.user._id).select("-password");
                  if(user)
                  {
                                    const {name, phone , address} =user;
                                    user.name =req.body.name || name;
                                    user.phone =req.body.phone || phone;
                                    user.address=req.body.address || address;
                                    const updatedUser = await user.save()
                                    res.status(200).json(updatedUser)
                  }
                  else{
                                    throw new Error("user not found");
                  }

})
// update photo 
 const updatePhoto = asyncHandler(async(req , res) =>{
       const {photo } = req.body;
       const user = await User.findById(req.user._id);
       user.photo = photo
       const updatedUser = await user.save()
       res.status(200).json(updatedUser)


 })
//Get user with role
const getUserWithRole = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user.id).select('-password');
 
   if (user) {
     res.status(200).json({
      
       role: user.role,
      
       // Add any other fields you want to include
     });
   } else {
     res.status(400).json({
       message: 'User not found',
     });
   }
 });
module.exports = {
   registerUser,
   loginUser,
   logout,
   getUser,
   getLoginStatus,
   updateUser,
   updatePhoto,
   getUserWithRole
};
