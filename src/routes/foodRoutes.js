import express from "express";
import { tokenvalidator } from "../middleware/authmiddleware.js";
import {
    createFoodController, getAllFoodsController, getSingleFoodController,
    getFoodByRestaurantController, updateFoodController,
    deleteFoodController, placeOrderController, orderStatusController, checkStatusofOrder
} from "../controllers/foodController.js";
import { adminMiddleware } from "../middleware/adminmiddleware.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Foods
 *     description: Food management APIs
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Food:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         foodName:
 *           type: string
 *         description:
 *           type: string
 *         foodPrice:
 *           type: number
 *         imageUrl:
 *           type: string
 *         foodTags:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 *         code:
 *           type: string
 *         isAvailable:
 *           type: boolean
 *         OrderTaken:
 *           type: boolean
 *         restaurantID:
 *           type: string
 *         rating:
 *           type: number
 *     FoodRequest:
 *       type: object
 *       properties:
 *         foodName:
 *           type: string
 *         description:
 *           type: string
 *         foodPrice:
 *           type: number
 *         imageUrl:
 *           type: string
 *         foodTags:
 *           type: string
 *           items:
 *             type: string
 *         category:
 *           type: string
 *         code:
 *           type: string
 *         isAvailable:
 *           type: boolean
 *         OrderTaken:
 *           type: boolean
 *         restaurantID:
 *           type: string
 *         rating:
 *           type: number
 *         processTime:
 *           type: number
 */

/**
 * @swagger
 * /food/create:
 *   post:
 *     summary: Create a new food item
 *     description: Adds a new food item to the database
 *     tags: [Foods]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodRequest'
 *     responses:
 *       201:
 *         description: Food item created successfully
 *       500:
 *         description: Server error or missing fields
 */
//CREATE FOOD
router.post("/create", tokenvalidator, createFoodController);


/**
 * @swagger
 * /food/getAll:
 *   get:
 *     summary: Get all food items
 *     description: Retrieves all food items from the database
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: Successfully retrieved all food items
 *       404:
 *         description: No food items found
 */
//GET ALL FOOD
router.get("/getAll", getAllFoodsController);


/**
 * @swagger
 * /food/get/{foodID}:
 *   get:
 *     summary: Get a single food item
 *     description: Retrieves a single food item by ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: foodID
 *         required: true
 *         schema:
 *           type: string
 *         description: The food item ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the food item
 *       404:
 *         description: Food item not found
 */
// GET SINGLE FOOD
router.get("/get/:foodID", getSingleFoodController);


/**
 * @swagger
 * /food/getByRestaurant/{restaurantID}:
 *   get:
 *     summary: Get food items by restaurant
 *     description: Retrieves food items belonging to a specific restaurant
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: restaurantID
 *         required: true
 *         schema:
 *           type: string
 *         description: The restaurant ID
 *     responses:
 *       200:
 *         description: Successfully retrieved food items for the restaurant
 *       404:
 *         description: No food items found for the restaurant
 */
// GET  FOOD by rest
router.get("/getByResturant/:restaurantID", getFoodByRestaurantController);


/**
 * @swagger
 * /food/update/{foodID}:
 *   put:
 *     summary: Update a food item
 *     description: Updates details of an existing food item
 *     tags: [Foods]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: foodID
 *         required: true
 *         schema:
 *           type: string
 *         description: The food item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FoodRequest'
 *     responses:
 *       200:
 *         description: Food item updated successfully
 *       404:
 *         description: Food item not found
 */
// UPDATE FOOD
router.put("/update/:foodID", tokenvalidator, updateFoodController);


/**
 * @swagger
 * /food/delete/{foodID}:
 *   delete:
 *     summary: Delete a food item
 *     description: Deletes a food item from the database
 *     tags: [Foods]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: foodID
 *         required: true
 *         schema:
 *           type: string
 *         description: The food item ID
 *     responses:
 *       200:
 *         description: Food item deleted successfully
 *       404:
 *         description: Food item not found
 */
// DELETE FOOD
router.delete("/delete/:foodID", tokenvalidator, deleteFoodController);


/**
 * @swagger
 * /food/placeorder:
 *   post:
 *     summary: Place an order
 *     description: Creates a new order for food items
 *     tags: [Foods]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     foodID:
 *                       type: string
 *                     RestaurantID:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       500:
 *         description: Server error
 */
// PLACE ORDER
router.post("/placeorder", tokenvalidator, placeOrderController);


/**
 * @swagger
 * /food/orderStatus/{orderID}:
 *   post:
 *     summary: Update order status
 *     description: Updates the status of an existing order
 *     tags: [Foods]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Preparing, Delay,Prepare, On the way, Delivered,Cancelled]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 */
// ORDER STATUS
router.post(
    "/orderStatus/:orderID",
    tokenvalidator,
    adminMiddleware,
    orderStatusController
);

router.post("/checktime", checkStatusofOrder)

export default router