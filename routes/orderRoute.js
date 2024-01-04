const express = require("express"); 
const router = express.Router();


const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getOrders, createOrder, deleteOrder } = require("../controllers/odercontroller");


router.get("/",  getOrders);
router.post("/create" , createOrder);
router.delete('/:id', deleteOrder)

// router.get("/" , getProducts);
// router.get("/:id" , getProduct);
// router.delete("/:id" , deleteProduct);
// router.patch("/:id", protect, adminOnly ,updateProduct);

// router.post("/review/:id", protect, reviewProduct);
// router.patch("/deletereview/:id", protect, deleteReview)

            
                

module.exports = router;
