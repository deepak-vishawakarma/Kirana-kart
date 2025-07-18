import mongoose from "mongoose";

const ProductDataSchema = new mongoose.Schema({
  ProductName: {
        type:String,
        required:true,

    },
  ProductPhoto: {
        type:String,
        required:true,
    },
  ProductDetails: {
        type:String,
        required:true,

    },
  ProductDiscriptions: {
        type:String,
        required:true,

    },
  ProductReating: {
        type:String,
        required:true,
 
    },
  ProductPrice:{
        type:Number,
        required:true,

    },
  ProductCetagorie: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories"
  }]
});

export default mongoose.model("Product", ProductDataSchema);