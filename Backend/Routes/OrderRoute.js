import express from "express";
import { placeOrder,GetOrder } from "../Controllers/OrderController.js";

const router = express.Router();

router.post("/", placeOrder);
router.get("/",GetOrder)


export default router;
