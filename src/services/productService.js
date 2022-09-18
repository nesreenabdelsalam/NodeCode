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
  function get(req,res) {
    const query = {};

    if(req.query.categoryid){
      query.categoryid = req.query.categoryid;
    }

    productModel().find(query).then(products => {
      res.status(200).json({"success":true, "result":products});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({"success":false, "messages":[err]});
    });
  }

  // insert a new product to database
  function post(req, res){ 
    const {name, image, price, quantity, categoryid} = req.body;
    const product = {name, image, price, quantity, categoryid};
  
    productModel().create(product).then(data => {
      res.status(200).json({"success":true, "result":data});
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({"success":false, "messages":[err]});
      });
  }

  //find item by Id and update the item
  function put(req,res){
    const pid = req.params.id;
    const {name, image, price, quantity, categoryid} = req.body;
    const product = {pid, name, image, price, quantity, categoryid};

    return  productModel().findOneAndReplace()
    .findOneAndUpdate({"_id":new mongoose.Types.ObjectId(pid)},product)
    .then(product => {
      res.status(200).json({"success":true, "result":product});
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({"success":false, "messages":[err]});
      });
  }

  //find item by Id
  function findById(req, res){
    const id = req.params.id;
    return productModel().findOne({"_id":new mongoose.Types.ObjectId(id)}).then(product => {
      res.status(200).json({"success":true, "result":product});
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({"success":false, "messages":[err]});
      });
  }


   //delete item by Id
   function deleteById(req,res){
    const id = req.params.id;
    return productModel().deleteOne({"_id":new mongoose.Types.ObjectId(id)}).then(product => {
      res.status(200).json({"success":true, "result":product});
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({"success":false, "messages":[err]});
      });
  }

  //patch item by Id
  function patch(req,res){
    const id = req.params.id;
    return productModel().findOne({"_id":new mongoose.Types.ObjectId(id)})
    .then(product => {
      if(req.body._id)
      {
        delete req.body._id;
      }
      Object.entries(req.body).forEach(item => {
        const key = item[0];
        const value = item[1];
    
        product[key] = value;
      });
      productModel().findOneAndUpdate({"_id":new mongoose.Types.ObjectId(id)},product)
      .then(product => {
        res.status(200).json({"success":true, "result":product});
        })
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({"success":false, "messages":[err]});
      });
  }
  
  return { get, post , put, findById, deleteById, patch};
}

