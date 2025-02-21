import express from "express";
import { loginController, registerController } from "../controllers/authController.js";
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - email
 *         - Password
 *         - Address
 *         - Phone
 *         - response
 *       properties:
 *         userName:
 *           type: string
 *         email:
 *           type: string
 *         Password:
 *           type: string
 *         Address:
 *           type: array
 *           items:
 *             type: string
 *         Phone:
 *           type: string
 *         response:
 *           type: string
 *         token:
 *           type: string
 *           description: JWT token for user authentication
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         userName: "johndoe"
 *         email: "johndoe@example.com"
 *         Password: "password123"
 *         Address: ["123 Main St"]
 *         Phone: "1234567890"
 *         response: "User registered successfully"
 */
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User management API
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully Registered
 *       400:
 *         description: Invalid email format
 *       404:
 *         description: Please provide all required fields
 *       409:
 *         description: Email Already Registered. Please Login
 *       500:
 *         description: Server error
 */
router.post("/register", registerController)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login for an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               Password:
 *                 type: string
 *             required:
 *               - email
 *               - Password
 *     responses:
 *       200:
 *         description: Login Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     userName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     Address:
 *                       type: array
 *                       items:
 *                         type: string
 *                     Phone:
 *                       type: string
 *                     response:
 *                       type: string
 *       400:
 *         description: Invalid email format
 *       404:
 *         description: User not found or Invalid credentials
 *       500:
 *         description: Server error
 */
router.post("/login", loginController)
export default router