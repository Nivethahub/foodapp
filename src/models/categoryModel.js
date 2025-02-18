import {  mongoose } from "mongoose";

//schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "category title is required",
    },
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
  },
  { timestamps: true }
);

//export
export default mongoose.model("Category", categorySchema, "Category")