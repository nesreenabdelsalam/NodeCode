import mongoose from "mongoose";

const Schema = mongoose.Schema;

let user = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  { collection: "users" }
);

export function userModel(){ return mongoose.model("users", user)};