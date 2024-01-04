const express = require("express");
const {registerUser, loginUser, logout, getUser, getLoginStatus, updateUser, updatePhoto, getUserWithRole} = require("../controllers/userController");
const  router = express.Router();
const {protect} = require("../middleware/authMiddleware")
router.post("/register" , registerUser , (req, res) => {
                  console.log('Request Body:', req.body);
                  res.json({ message: 'Test route received data' });}
)
router.post("/login" , loginUser);
router.get("/logout" ,logout );
router.get("/getUser", protect, getUser);
router.get("/getloginstatus" , getLoginStatus);
router.patch("/updateuser" , protect, updateUser);
router.patch("/updatePhoto" , protect , updatePhoto);
router.get("/userrole" , protect, getUserWithRole)
                

module.exports = router;
