import { mongoose } from "mongoose";
import { type } from "os";


const ordersSchema = new mongoose.Schema(
  {
    foods: [{
      foodID: { type: mongoose.Schema.Types.ObjectId, ref: "Foods" },
      quantity: { type: Number },
      RestaurantID: {
        type:
          mongoose.Schema.Types.ObjectId, ref: "Restaurant"
      },
      TakenByrestaurant: {
        type: Boolean,
        default: false
      }
    }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    DeliverTime: {
      type: String,
      default: "10 mins"
    },
    OrderedTime: {
      type: Number,
      default: Date.now()
    },
    isReady: {
      type: Boolean,
      default: false
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    estimatedDeliveryTime: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["Preparing", "Prepare", "On the way", "Delivered", "Cancelled", "Delay"],
      default: "Preparing",
    },
  },
  { timestamps: true }
);


export default mongoose.model("Orders", ordersSchema, "Orders");