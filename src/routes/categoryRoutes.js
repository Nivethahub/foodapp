import express from "express";
import { tokenvalidator } from "../middleware/authmiddleware.js";
import { createCatController, getAllCatController, updateCatController, deleteCatController } from "../controllers/categoryController";


const router = express.Router();

// CREATE CAT
router.post("/create", tokenvalidator, createCatController);

//GET ALL CAT
router.get("/getAll", getAllCatController);

// UPDATE CAT
router.put("/update/:categoryID", tokenvalidator, updateCatController);

// DLEETE CAT
router.delete("/delete/:categoryID", tokenvalidator, deleteCatController);
export default router