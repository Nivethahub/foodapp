import {  mongoose } from "mongoose";

//schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required:"Food Title is require",
    },
    description: {
      type: String,
      required:  "food description is required",
    },
    price: {
      type: Number,
      required: "food price is required",
    },
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodTags: {
      type: String,
    },
    catgeory: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailabe: {
      type: Boolean,
      default: true,
    },
    restaurantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

//export
export default mongoose.model("Foods", foodSchema,"Foods");