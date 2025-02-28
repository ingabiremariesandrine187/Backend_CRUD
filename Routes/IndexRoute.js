import express from"express";
import contactRouter from "../Routes/contactRoute.js"
import productRouter from "./productRoute.js";
const mainRouter = express.Router();
mainRouter.use("/Contact", contactRouter);
mainRouter.use("/Product", productRouter);
export default mainRouter;      
        