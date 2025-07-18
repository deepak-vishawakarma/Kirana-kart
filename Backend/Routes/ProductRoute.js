import { Router } from "express";
import ProductController from "../Controllers/ProductController.js";

import upload from "../multerConfig.js";  


const router = Router();

router.post("/data", upload.single("image"), ProductController.CreateProduct);
router.get("/data", ProductController.GetProduct);
router.get("/data/:id", ProductController.GetProductById);
router.delete("/data/:id", ProductController.DeleteProduct);
router.put("/data/:id", upload.single("image"), ProductController.UpdateProduct);

export default router;
