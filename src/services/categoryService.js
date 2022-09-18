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
  function getCategories(req,res) {
      return categoryModel().find({}).then(categories => {
        res.status(200).json({"success":true, "result":categories});
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({"success":false, "messages":[err]});
      });
  }

  // insert a new product to database
  function insertCategory(req,res) {
    
    const {name} = req.body;
    const category = {name};

      return categoryModel().create(category).then(category => {
        res.status(200).json({"success":true, "result":category});
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({"success":false, "messages":[err]});
      });
  }
  return { getCategories, insertCategory};
}

