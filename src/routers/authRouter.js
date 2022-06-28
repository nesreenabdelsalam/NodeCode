import express from "express";
const authRouter = express.Router();

import passport from "passport";
import {userService} from '../../src/services/userService.js';

authRouter.route('/register').get((req, res)=>{
    res.render('signup');
}).post((req, res)=>{
    const {name, password, email} = req.body;
        try{
            const user = {name, password, email};
            userService().insertUser(user).then(data => {
                console.log(data);
                req.login(data,()=>{
                    res.redirect('/admin');
                });
              })
              .catch(err => {
                console.error(err);
              });;
            
        }catch(error){
            console.log(error.stack);
        }
    });

authRouter.route('/profile').get((req, res)=>{
    res.json(req.user);
});

authRouter.route('/login').get((req, res)=>{
    res.render('signin');

}).post(passport.authenticate('local-signin',{
    successRedirect : '/admin',
    failureMessage: ''
}));

export {authRouter}