import express from "express";
import { tokenvalidator } from "../middleware/authmiddleware.js";
import { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController }
    from "../controllers/restaurantController.js";


const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Restaurants
 *     description: Restaurant management APIs
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         restaurantName:
 *           type: string
 *         imageUrl:
 *           type: string
 *         foods:
 *           type: array
 *           items:
 *             type: string
 *         OrderacceptTiming:
 *           type: string
 *         isorderTaken:
 *           type: boolean
 *         pickup:
 *           type: boolean
 *         delivery:
 *           type: boolean
 *         isOpen:
 *           type: boolean
 *         logoUrl:
 *           type: string
 *         rating:
 *           type: number
 *         ratingCount:
 *           type: number
 *         code:
 *           type: string
 *         coords:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *     RestaurantRequest:
 *       type: object
 *       properties:
 *         restaurantName:
 *           type: string
 *         imageUrl:
 *           type: string
 *         foods:
 *           type: array
 *           items:
 *             type: string
 *         OrderacceptTiming:
 *           type: string
 *         isorderTaken:
 *           type: boolean
 *         pickup:
 *           type: boolean
 *         delivery:
 *           type: boolean
 *         isOpen:
 *           type: boolean
 *         logoUrl:
 *           type: string
 *         rating:
 *           type: number
 *         ratingCount:
 *           type: number
 *         code:
 *           type: string
 *         coords:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 */

/**
 * @swagger
 * /restaurant/create:
 *   post:
 *     summary: Create a new restaurant
 *     description: Adds a new restaurant to the database
 *     tags: [Restaurants]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RestaurantRequest'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       500:
 *         description: Server error or missing fields
 */

// CRAETE Restaurant || POST
router.post("/create", tokenvalidator, createRestaurantController);


/**
 * @swagger
 * /restaurant/getAll:
 *   get:
 *     summary: Get all restaurants
 *     description: Retrieves a list of all available restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of restaurants retrieved successfully
 *       404:
 *         description: No restaurants found
 *       500:
 *         description: Server error
 */
// GET ALL Restaurant || GET
router.get("/getAll", getAllRestaurantController);


/**
 * @swagger
 * /restaurant/get/{restaurantID}:
 *   get:
 *     summary: Get a restaurant by ID
 *     description: Retrieves details of a specific restaurant using its ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: restaurantID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the restaurant
 *     responses:
 *       200:
 *         description: Restaurant details retrieved successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */
// GET Restaurant BY ID || GET
router.get("/get/:restaurantID", getRestaurantByIdController);


/**
 * @swagger
 * /restaurant/delete/{restaurantID}:
 *   delete:
 *     summary: Delete a restaurant
 *     description: Deletes a restaurant from the database using its ID
 *     tags: [Restaurants]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the restaurant to delete
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */
// DELETE Restaurant || DELETE
router.delete("/delete/:restaurantID", tokenvalidator, deleteRestaurantController);

export default router