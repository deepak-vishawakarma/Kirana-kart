import { Router } from "express";
import CategoriesController from "../Controllers/CategoriesController.js";
import upload from "../multerConfig.js"; 

const router = Router();

router.post("/data", upload.single("image"), CategoriesController.CreateCategorie);

router.get("/data", CategoriesController.GetCategorie);

router.get("/data/:id", CategoriesController.GetCategorieById);

router.put("/data/:id", upload.single("image"), CategoriesController.UpdateCategorieById);

router.delete("/data/:id", CategoriesController.DeleteCategorieById);

export default router;
