import { Schema, mongoose } from "mongoose";
const Userschema = new mongoose.Schema({
    userName: {
        type: String,
        required: "username is required"
    },
    email: {
        type: String,
        required: "email is required"
    },
    Password: {
        type: String,
        required: "Password is required"
    },
    Address: {
        type: Array
    },
    Phone: {
        type: String,
        required: "Phone number is required"
    },
    userType: {
        type: String,
        required: "usertype is required",
        default: "Client",
        enum: ["Client", "Admin", "Vender", "Driver"]
    },
    Profile: {
        type: String,
        default: "https://cdn.iconscout.com/icon/free/png-256/free-user-icon-download-in-svg-png-gif-file-formats--profile-avatar-account-person-app-interface-pack-icons-1401302.png"
    },
    response: {
        type: String,
        required: "response is required"
    }

}, { timestamps: true })
export default mongoose.model("User", Userschema, "User")