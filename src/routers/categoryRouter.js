import express from "express";
import {categoryService} from '../../src/services/categoryService.js';

const categoryRouter = express.Router();

categoryRouter.route('/').get((req, res)=>{ 
  console.log('try to render categories');
  categoryService().getCategories().then(categories => {
      console.log(categories);
      console.log('try to render categories');
      res.json(categories);
    })
    .catch(err => {
      console.error(err);
    });;
}).post((req, res)=>{ 
  const {name} = req.body;
  const category = {name};

    categoryService().insertCategory(category).then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
    });
});

export {categoryRouter}