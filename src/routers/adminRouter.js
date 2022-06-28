import express from "express";
import {productService} from '../../src/services/productService.js';

const adminRouter = express.Router();

adminRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/login');
    }
});

adminRouter.route('/').get((req, res)=>{
    productService().getProducts().then(products => {
        res.render('adminPages/products',{products});
      })
      .catch(err => {
        console.error(err);
      });
});

//default route that
adminRouter.route('/view').get((req, res)=>{
    productService().getProducts().then(products => {
        res.render('adminPages/products',{products});
      })
      .catch(err => {
        console.error(err);
      });
});

adminRouter.route('/addNew').get((req, res)=>{
    const product = {};
    res.render('adminPages/addProduct',{product});
}).post((req, res)=>{
    
    const {id, name, image, description} = req.body;
    const product = {id, name, image, description};

      productService().insertProduct(product).then(data => {
        res.redirect('/admin');
      })
      .catch(err => {
        console.error(err);
      });;
});;

adminRouter.route('/edit/:id').get((req, res)=>{
    console.log('try to render products');
    const id = req.params.id;
    productService().findById(id).then(product => {
        res.render('adminPages/addProduct',{product})
      })
      .catch(err => {
        console.error(err);
      });;
}).post((req, res)=>{
    
    console.log('try to render products');
    const _id = req.params.id;
    
    const {id, name, image, description} = req.body;
    const product = {id, name, image, description};

    productService().findByIdAndUpdate(_id, product).then(data => {
        console.log(data);
        console.log('try to render products');
        res.redirect('/admin');
      })
      .catch(err => {
        console.error(err);
      });;
   
});

adminRouter.route('/delete/:id').post((req, res)=>{
    const id = req.params.id;
    productService().deleteById(id).then(product => {
        res.redirect('/admin')
      })
      .catch(err => {
        console.error(err);
      });;
   
  });

export {adminRouter}