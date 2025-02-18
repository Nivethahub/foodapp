import express from "express";
import { tokenvalidator } from "../middleware/authmiddleware.js";
import {
    createFoodController, getAllFoodsController, getSingleFoodController,
    getFoodByRestaurantController, updateFoodController,
    deleteFoodController, placeOrderController, orderStatusController
} from "../controllers/foodController";
import { adminMiddleware } from "../middleware/adminmiddleware.js";
const router = express.Router();

//routes
//CREATE FOOD
router.post("/create", tokenvalidator, createFoodController);

//GET ALL FOOD
router.get("/getAll", getAllFoodsController);

// GET SINGLE FOOD
router.get("/get/:foodID", getSingleFoodController);

// GET  FOOD by rest
router.get("/getByResturant/:restaurantID", getFoodByRestaurantController);

// UPDATE FOOD
router.put("/update/:foodID", tokenvalidator, updateFoodController);

// DELETE FOOD
router.delete("/delete/:foodID", tokenvalidator, deleteFoodController);

// PLACE ORDER
router.post("/placeorder", tokenvalidator, placeOrderController);

// ORDER STATUS
router.post(
    "/orderStatus/:orderID",
    tokenvalidator,
    adminMiddleware,
    orderStatusController
);

export default router