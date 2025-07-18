import UserModel from "../Models/UserModel.js";

export const addToCart = async(req,res) => {
    const { product,userId } = req.body;
    try {
const user = await UserModel.findByIdAndUpdate(
  userId,
  { $push: { cart: product} },
  { new: true } // return the updated document
).populate("cart"); // populate the updated cart

return res.status(200).json({ cart: user.cart, msg: "Product added to the cart" });
    } catch (error) {
        console.log("error in add to cart controller");
        res.status(500).json({msg: "internal server error"});
    }
}


export const  getCart = async(req,res) => {
    try {
        const user = await UserModel.findById(req.params.id).populate("cart");
       return res.status(200).json(user.cart);
    } catch (error) {
        console.log("error in get cart controller");
        res.status(500).json({msg: "internal server error"});
    }
}

export const removeFromCart = async(req,res) => {
   const user = await UserModel.findByIdAndDelete(req.params.id,)
   try {
    return res.status(200).json({msg: "product removed from cart"});
    } catch (error) {
        console.log("error in remove from cart controller");
        res.status(500).json({msg: "internal server error"});
   }
}

    
