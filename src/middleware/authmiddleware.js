import jwt from "jsonwebtoken"
export const tokenvalidator = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json("Authorization header missing");
        }
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).json("Unauthorized User");
            } else {
                req.body.id = decoded.id;
                next();
            }
        });
    } catch (error) {
        return res.status(500).json("Error in auth API")
    }
}