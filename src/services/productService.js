import mongoose from 'mongoose';
import {productModel} from '../models/productModel.js';

const baseurl  = 'mongodb+srv://admin:Xyz78901@globomantics.bbm7o.mongodb.net/SampleDB?retryWrites=true&w=majority';

mongoose.connect(baseurl);
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

export function productService() {
  
  //get all products from database
  async function getProducts() {
      return await productModel().find({});
  }

  // insert a new product to database
  async function insertProduct(data) {
    return await productModel().create(data);
  }

  //find item by Id and update the item
  async function findByIdAndUpdate(id, product){
    return await productModel().findOneAndUpdate({"_id":new mongoose.Types.ObjectId(id)},product);
  }

  //find item by Id
  async function findById(id){
    return await productModel().findOne({"_id":new mongoose.Types.ObjectId(id)});
  }

   //delete item by Id
   async function deleteById(id){
    return await productModel().deleteOne({"_id":new mongoose.Types.ObjectId(id)});
  }
  
  return { getProducts, insertProduct , findByIdAndUpdate, findById, deleteById};
}

//module.exports = productService();
