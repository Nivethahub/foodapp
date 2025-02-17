import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs";
export const registerController = async (req, res) => {
    try {
        const { userName, email, Password, Address, Phone } = req.body
        if (!userName || !email || !Password || !Address || !Phone) {
            return res.status(404).send("Please provide all Fields")
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send("Invalid email format");
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).send("Email Alredy Registered. Please Login")
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(Password, salt)
            const user = await userModel.create({ userName, email, Password: hashedPassword, Phone, Address })
            return res.status(201).send("Successfully Registered")
        }

    } catch (error) {
        return res.status(500).send(error)
    }
}

export const loginController = async () => {
    try {
        const { email, Password } = req.body
        if (!email || !Password) {
            return res.status(500).send("Please provide email or password")
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send("User not found")
        } else {
            const isMatch = await bcrypt.compare(Password, user.Password)
            if (!isMatch) {
                return res.status(404).send("Invalid credentails")
            }
            return res.status(200).send({ message: "Login Sucessfully", user })
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}