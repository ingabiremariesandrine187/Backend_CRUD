import  ContactRoute from ' ./ContactRoute.js';
import express from"express";
const router = express.Router();
router.use("/contact",ContactRoute);
export default router;              