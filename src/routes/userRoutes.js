import express from "express";
import { getUsercontroller, ResetPassword, updateUsercontroller } from "../controllers/userController.js";
import { tokenvalidator } from "../middleware/authmiddleware.js";
const router = express.Router()

router.get("/Users", tokenvalidator, getUsercontroller)
router.put("/User", tokenvalidator, updateUsercontroller)
router.post("/User/resetPassword", tokenvalidator, ResetPassword)
router.delete("/User/:userID", tokenvalidator, ResetPassword)
export default router