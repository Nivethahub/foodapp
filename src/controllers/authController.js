import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export const registerController = async (req, res) => {
    try {
        const { userName, email, Password, Address, Phone, response } = req.body
        if (!userName || !email || !Password || !Address || !Phone || !response) {
            return res.status(404).json("Please provide all Fields")
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json("Invalid email format");
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json("Email Alredy Registered. Please Login")
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(Password, salt)
            const user = await userModel.create({ userName, email, Password: hashedPassword, Phone, Address, response })
            return res.status(201).json("Successfully Registered")
        }

    } catch (error) {
        return res.status(500).json(error)
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, Password } = req.body
        if (!email || !Password) {
            return res.status(500).json("Please provide email or password")
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json("User not found")
        } else {
            const isMatch = await bcrypt.compare(Password, user.Password)
            if (!isMatch) {
                return res.status(404).json("Invalid credentails")
            }

            //token data
            const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
                expiresIn: "3hrs"
            })

            user.Password = undefined  //to hide the password in response

            return res.status(200).json({ message: "Login Sucessfully", token, user })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}