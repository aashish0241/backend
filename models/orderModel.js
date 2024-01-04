const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
  },
  address: {
    type: String,
    require: true,
    trim: true,
  },

  message: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
  },

  contact: {
    type: Number,
    required: [true, "Please add a name"],
    trim: true,
  },
  
  payment: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
  },
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
