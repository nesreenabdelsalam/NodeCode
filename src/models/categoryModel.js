import mongoose from "mongoose";

const Schema = mongoose.Schema;

let category = new Schema(
  {
    name: {
      type: String
    }
  },
  { collection: "category" }
);

export function categoryModel(){ return mongoose.model("category", category)};