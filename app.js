import express from "express";
import chalk from "chalk";
import debug from "debug";
import morgan from "morgan";
import path from "path";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";

import { fileURLToPath } from 'url';
import {productRouter} from './src/routers/productRouter.js';
import {adminRouter} from './src/routers/adminRouter.js';
import {authRouter} from './src/routers/authRouter.js';
import {apiRouter} from './src/routers/apiRouter.js';
import {passportConfig} from './src/config/passport.js';

debug('app');

debug(`Start Listenning to port ${chalk.green('3000')}`);

const app = express();
app.use(morgan("combined"));
const PORT = process.env.PORT || 5000;
console.log(process.env);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'/public/')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret:'globomantics'}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig(app);

app.set('views','./src/views');
app.set('view engine', 'ejs');


app.use('/products',productRouter);
app.use('/admin',adminRouter);
app.use('/',authRouter);
app.use('/',apiRouter);

app.get('/',(req, res)=>{
    res.render('index');
});

app.listen(PORT,()=>{
    debug(`Listenning on port ${chalk.green('3000')}`);
});