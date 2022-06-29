import mongoose from "mongoose";

const Schema = mongoose.Schema;

let product = new Schema(
  {
    name: {
      type: String
    },
    image: {
      type: String
    },
    description: {
      type: String
    }
  },
  { collection: "products" }
);

export function productModel(){ return mongoose.model("products", product)};