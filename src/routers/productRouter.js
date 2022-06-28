import express from "express";
import {productService} from '../../src/services/productService.js';

const productRouter = express.Router();

productRouter.route('/').get((req, res)=>{
    console.log('try to render products');
    productService().getProducts().then(products => {
        console.log(products);
        console.log('try to render products');
        res.render('products',{products});
      })
      .catch(err => {
        console.error(err);
      });;
    
});

productRouter.route('/:id').get((req, res)=>{
    console.log('try to render products');
    const id = req.params.id;
    productService().findById(id).then(product => {
        res.render('product',{product})
      })
      .catch(err => {
        console.error(err);
      });;
});

export {productRouter}