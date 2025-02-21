import express from "express";
import { tokenvalidator } from "../middleware/authmiddleware.js";
import { createCatController, getAllCatController, updateCatController, deleteCatController } from "../controllers/categoryController.js";


const router = express.Router();



/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management APIs
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         imageUrl:
 *           type: string
 *     CategoryRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         imageUrl:
 *           type: string
 */

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create a new category
 *     description: Adds a new category to the database
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryRequest'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Server error or missing fields
 */
// CREATE CAT
router.post("/create", tokenvalidator, createCatController);


/**
 * @swagger
 * /category/getAll:
 *   get:
 *     summary: Retrieve all categories
 *     description: Fetches a list of all categories available
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       404:
 *         description: No categories found
 *       500:
 *         description: Server error
 */
//GET ALL CAT
router.get("/getAll", getAllCatController);


/**
 * @swagger
 * /category/update/{categoryID}:
 *   put:
 *     summary: Update a category
 *     description: Modifies an existing category by ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryRequest'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
// UPDATE CAT
router.put("/update/:categoryID", tokenvalidator, updateCatController);


/**
 * @swagger
 * /category/delete/{categoryID}:
 *   delete:
 *     summary: Delete a category
 *     description: Removes a category by its ID
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
// DLEETE CAT
router.delete("/delete/:categoryID", tokenvalidator, deleteCatController);
export default router