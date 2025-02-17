import mongoose from "mongoose";
const connectionDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected");
    } catch (error) {
        console.log("Mongoose eror:", error);
    }
}
export default connectionDb