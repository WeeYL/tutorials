import express from "express";
import { PORT, MERNdbURL } from "./config.js";
import mongoose from "mongoose";
import * as mongooseHelper from "../mongooseHelper.js";
import catsRoute from './routes/catsRoute.js'
import cors from 'cors'


const app = express();
app.use(express.json()); 
app.use(cors())

// PORT
app.listen(PORT, () =>
  console.log(`listening to ${PORT} http://localhost:${PORT}`)
);
// Mongoose
mongooseHelper.connection(mongoose, MERNdbURL);

// cats route
app.use('/cats',catsRoute)

