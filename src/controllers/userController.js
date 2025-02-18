import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs";
export const getUsercontroller = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body._id)
        if (!userData) {
            return res.status(404).json("User not found")
        }
        userData.Password = undefined
        return res.status(200).json(userData)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateUsercontroller = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body._id)
        if (!userData) {
            return res.status(404).json("User not found")
        }
        const { userName, Address, Phone } = req.body
        if (userName) userData.userName = userName
        if (Address) userData.Address = Address
        if (Phone) userData.Phone = Phone
        await userData.save()
        return res.status(200).json("User updated successfully")
    } catch (error) {
        return res.status(500).json(error)

    }
}

export const ResetPassword = async (req, res) => {
    try {
        const { email, newPassword, response } = req.body
        if (!email || !newPassword || !response) {
            return res.status(500).json("Please provide all Fields")
        }
        const userData = await userModel.findOne({ email, response })
        if (!userData) {
            return res.status(404).json("User not found or invalid response")
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        userData.Password = hashedPassword
        userData.save()
        return res.status(200).json("Password Reset Successfull")
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const DeleteProfilecontroller = (req, res) => {

}