import mongoose from 'mongoose';
import {userModel} from '../models/UserModel.js';

const baseurl  = 'mongodb+srv://admin:Xyz78901@globomantics.bbm7o.mongodb.net/SampleDB?retryWrites=true&w=majority';

mongoose.connect(baseurl);
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

export function userService() {
  
  //get all products from database
  async function getUserByEmail(email) {
    return await userModel().findOne({email});
  }

  // insert a new product to database
  async function insertUser(data) {
    return await userModel().create(data);
  }

  
  return { getUserByEmail, insertUser };
}

//module.exports = productService();
