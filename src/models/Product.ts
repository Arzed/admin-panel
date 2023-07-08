import mongoose, { Schema, model, Model } from "mongoose";
import { IProduct } from "@/types";

const productSchema = new Schema(
  {
    description: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: true, default: 0 },
    title: { type: String, required: true, default: "" },
  }
);

//We create the index and we will use the title as references for the search
productSchema.index({ title: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product || model("Product", productSchema);

export default Product;