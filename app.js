import express from "express";
import chalk from "chalk";
import debug from "debug";
import morgan from "morgan";
import path from "path";
import cors from "cors";

import { fileURLToPath } from 'url';
import {productRouter} from './src/routers/productRouter.js';
import {categoryRouter} from './src/routers/categoryRouter.js';

debug('app');
debug(`Start Listenning to port ${chalk.green('4000')}`);

const app = express();
app.use(morgan("combined"));
const PORT = process.env.PORT || 5000;
console.log(process.env);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'/public/')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

var corsOptions = {
    origin: '*'
  }
app.use(cors(corsOptions));

app.use('/products',productRouter);
app.use('/categories',categoryRouter);

app.listen(PORT,()=>{
    debug(`Listenning on port ${chalk.green('4000')}`);
});