import userModel from "../models/userModel.js"
export const adminMiddleware = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (user.usertype !== "admin") {
            return res.status(401).json({
                message: "Only Admin ACess",
            });
        } else {
            next();
        }
    } catch (error) {
        return res.status(500).json({
            message: "Un-Authorized ACCESS",
            error,
        });
    }
};