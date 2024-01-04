const mongoose = require("mongoose");


const productSchema = mongoose.Schema(
              {
                  name: {
                                    type: String,
                                    required: [true, "Please add a name"],
                                    trim: true,
                                  },
                                  sku:{
                                    type:String,
                                    require: true,
                                    default:"SKU",
                                    trim:true,
                                  },
                                  category:{
                                    type: String,
                                    required:[true, "please add a category"],
                                    trim: true,
                                  },
                                  brand:{
                                    type: String,
                                    required:[true, "please add a brand"],
                                    trim: true,
                                  },
                                  color:{
                                    type: String,
                                    required:[true, "please add a color"],
                                    default: "as seen",
                                    trim: true,
                                  },
                                  
                  description: {
                    type: String,
                    required: [true, "Please add a name"],
                    trim: true,
                  },
                  
                  quantity: {
                    type: Number,
                    required: [true, "Please add a name"],
                    trim: true,
                  },
                  price: {
                    type: Number,
                    required: [true, "Please add a name"],
                    trim: true,
                  }, 
                  regularPrice: {
                    type: Number,
                    required: [true, "Please add a name"],
                    trim: true,
                  },
                  image:{
                    type:String,
                    require: [true, "please add image url"]
                  }
                                
              }    
                  
)

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
  