import express from "express";
import { getUsercontroller, ResetPassword, updateUsercontroller, DeleteProfilecontroller } from "../controllers/userController.js";
import { tokenvalidator } from "../middleware/authmiddleware.js";
const router = express.Router()


/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management APIs
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         userName:
 *           type: string
 *         email:
 *           type: string
 *         Address:
 *           type: string
 *         Phone:
 *           type: string
 *     ResetPasswordRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         newPassword:
 *           type: string
 *         response:
 *           type: string
 */

/**
 * @swagger
 * /Users:
 *   get:
 *     summary: Retrieve user details
 *     description: Get details of a user by their ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/Users", tokenvalidator, getUsercontroller)
/**
 * @swagger
 * /User:
 *   put:
 *     summary: Update user details
 *     description: Update user information like name, address, and phone number
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               Address:
 *                 type: string
 *               Phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put("/User", tokenvalidator, updateUsercontroller)
/**
 * @swagger
 * /User/resetPassword:
 *   post:
 *     summary: Reset user password
 *     description: Allows users to reset their password using email and response verification
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       404:
 *         description: User not found or invalid response
 *       500:
 *         description: Server error
 */
router.post("/User/resetPassword", tokenvalidator, ResetPassword)
/**
 * @swagger
 * /User/{userID}:
 *   delete:
 *     summary: Delete user account
 *     description: Permanently deletes a user account
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       500:
 *         description: Server error
 */
router.delete("/User/:userID", tokenvalidator, DeleteProfilecontroller)
export default router