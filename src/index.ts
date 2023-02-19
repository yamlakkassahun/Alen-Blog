import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import { AuthRouter, UserRouter, BlogRouter } from './routes';
import mongoose from 'mongoose';
import { errorMiddleware } from './middleware';
import { AdminRouter } from './routes/AdminRoute';

mongoose.set('strictQuery', false);

mongoose
  .connect( "mongodb://localhost:27017/Alen_Blog")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express()
dotenv.config();
app.use(passport.initialize());
require('./config/passport');
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/blog', BlogRouter)
app.use('/admin', AdminRouter)
app.use(errorMiddleware);

app.listen(4000, () => console.log(`Example app listening on http://localhost:4000`))