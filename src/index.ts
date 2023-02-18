import express from 'express'
import dotenv from 'dotenv';

import { TestRouter } from './routes';
import mongoose from 'mongoose';
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


app.get('/', (req, res) => res.send('Hello World!'))
app.use('/test', TestRouter);
// simple route

app.listen(4000, () => console.log(`Example app listening on port 4000!`))