import { Router } from "express";
import { getCart,addToCart,removeFromCart} from "../Controllers/CartController.js";
const router = Router();

router.post("/", addToCart);
router.get("/:id", getCart);
router.delete("/delete/:id",removeFromCart)

export default router;
