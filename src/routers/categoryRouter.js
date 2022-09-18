import express from "express";
import {categoryService} from '../../src/services/categoryService.js';

const categoryRouter = express.Router();

categoryRouter.route('/')
  .get((req, res) => categoryService().getCategories(req,res))
  .post((req, res)=> categoryService().insertCategory(req,res));

export {categoryRouter}