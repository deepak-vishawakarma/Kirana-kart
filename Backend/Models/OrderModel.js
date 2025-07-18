import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: 
  { type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  productId: 
  { type: mongoose.Schema.Types.ObjectId, 
    ref: "Product" 
  },
  address: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Order", OrderSchema);
