import userModel from "../models/userModel.js"
export const adminMiddleware = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.body.userID);
        if (user.userType !== "Admin") {
            return res.status(401).json({
                message: "Only Admin Can Access",
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(500).json({
            message: "Un-Authorized Access",
            error,
        });
    }
};