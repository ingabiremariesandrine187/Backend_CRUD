import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mainRouter from './Routes/indexRoute.js';
import bodyParser from 'body-parser';
dotenv.config();
const port =process.env.PORT;
const db_user =process.env.DB_USER;
const db_name =process.env.DB_NAME;
const db_pass =process.env.DB_PASS;



const app=express();
app.use(express.json())

app.use('/', mainRouter);
const dbUri = `mongodb+srv://${db_user}:${db_pass}@cluster0.ppff3.mongodb.net/${db_name}`;

mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node API is running on port http://localhost:${port}`);
     
    });
  })
  .catch((error) => {
    console.log(error);
  });