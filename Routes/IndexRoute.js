import express from"express";
import contactRouter from "../Routes/contactRoute.js"
const mainRouter = express.Router();
mainRouter.use("/Contact", contactRouter);
export default mainRouter;              