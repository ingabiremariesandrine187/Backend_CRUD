import express from  'express';
import mongoose from 'mongoose';
import contactRoute from './Routes/contactRoute.js'
const app=express();
   const port = process.env.PORT || 5000;
const dbUri = `mongodb+srv://ireneeiradukunda9:TFjC3Prx7PA7CRPH@cluster0.njw9y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.use(express.json());
    app.listen(port, () => {
      console.log(`Node API is running on port http://localhost:${port}`);
      app.use('/api/contact',contactRoute)
    });
  })
  .catch((error) => {
    console.log(error);
  });