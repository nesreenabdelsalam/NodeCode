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
    price: {
      type: String
    },
    quantity: {
      type: Number
    },
    categoryid:{
      type: Schema.Types.ObjectId
    }
  },
  { collection: "products" }
);

export function productModel(){ return mongoose.model("products", product)};