import { createcontact } from "../Controller/Contactcontroller.js";
import express from"express";
const router = express.Router();
router.post("/add",createcontact);
export default router;
;