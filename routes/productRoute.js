const express = require("express"); 
const router = express.Router();
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct, reviewProduct, deleteReview } = require("../controllers/productController.js");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/",  createProduct);
router.get("/" , getProducts);
router.get("/:id" , getProduct);
router.delete("/:id" , deleteProduct);
router.patch("/:id", protect, adminOnly ,updateProduct);

router.post("/review/:id", protect, reviewProduct);
router.patch("/deletereview/:id", protect, deleteReview)

            
                

module.exports = router;
