import passport from "passport";
import {Strategy} from "passport-local";
import {userService} from '../../../src/services/userService.js';

export function localStrategy(){
    passport.use('local-signin',new Strategy({
        usernameField : 'email',
        passwordField : 'password'
    },(username, password, done)=>{
        userService().getUserByEmail(username).then(user => {
            if (user && user.password === password) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch(err => {
            console.log(error.stack);
        });;
    }));
};