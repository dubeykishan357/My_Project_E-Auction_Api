import express from "express";
import * as CategoryController from "../controller/category.controller.js";

var router = express.Router();

router.post("/save",CategoryController.save);

router.get("/fetch",CategoryController.fetch);

// router.delete("/delete",CategoryController.deleteCategory);

// router.patch("/update",CategoryController.update);

export default router;