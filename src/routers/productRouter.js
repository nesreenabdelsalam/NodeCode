import express from "express";
import {productService} from '../../src/services/productService.js';

const productRouter = express.Router();

productRouter.route('/')
  .get((req, res)=>{ productService().get(req,res)})
  .post((req,res)=>{ productService().post(req,res);});

productRouter.route('/:id')
  .get((req, res)=>{ productService().findById(req,res)})
  .delete((req, res)=>{ productService().deleteById(req, res)})
  .put((req, res)=>{ productService().put(req, res)})
  .patch((req, res)=>{ productService().patch(req,res)});

export {productRouter}