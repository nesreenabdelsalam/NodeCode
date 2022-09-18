import mongoose from 'mongoose';
import {categoryModel} from '../models/categoryModel.js';

const baseurl  = 'mongodb+srv://admin:Xyz78901@globomantics.bbm7o.mongodb.net/SampleDB?retryWrites=true&w=majority';

mongoose.connect(baseurl);
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

export function categoryService() {
  
  //get all categories from database
  async function getCategories() {
      return await categoryModel().find({});
  }

  // insert a new product to database
  async function insertCategory(data) {
      return await categoryModel().create(data);
  }
  return { getCategories, insertCategory};
}

