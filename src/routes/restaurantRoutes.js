import express from "express";
import { tokenvalidator } from "../middleware/authmiddleware.js";
const authMiddleware = require("../middlewares/authMiddleware");
import { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } from "../controllers/restaurantController.js";


const router = express.Router();

//routes
// CRAETE RESTURANT || POST
router.post("/create", tokenvalidator, createRestaurantController);

// GET ALL RESTURANTS || GET
router.get("/getAll", getAllRestaurantController);

// GET RESTURANT BY ID || GET
router.get("/get/:restaurantID", getRestaurantByIdController);

// DELETE RESTURANT || DELETE
router.delete("/delete/:restaurantID", tokenvalidator, deleteRestaurantController);

export default router