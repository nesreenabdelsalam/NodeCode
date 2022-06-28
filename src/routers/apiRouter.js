import express from "express";
import {productService} from '../services/productService.js';

const apiRouter = express.Router();

apiRouter.route('/product').get((req, res)=>{ 
  console.log('try to render products');
  productService().getProducts().then(products => {
      console.log(products);
      console.log('try to render products');
      res.json(products);
    })
    .catch(err => {
      console.error(err);
    });;
}).post((req, res)=>{ 
  const {id, name, image, description} = req.body;
  const product = {id, name, image, description};

    productService().insertProduct(product).then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
    });
});

apiRouter.route('/product/:id').get((req, res)=>{
    console.log('try to render products');
    const id = req.params.id;
    productService().findById(id).then(product => {
      res.json(product);
      })
      .catch(err => {
        console.error(err);
      });;
});

export {apiRouter}