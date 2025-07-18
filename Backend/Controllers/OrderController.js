import Order from "../Models/OrderModel.js";

// Place Order
export const placeOrder = async (req, res) => {
  const { userId, productId, address } = req.body;
  try {
    const newOrder = new Order({ userId, productId, address });
    await newOrder.save();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

// Get All Orders
export const GetOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("productId"); // optional populate
    res.status(200).json({ message: "Orders fetched", orders });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
