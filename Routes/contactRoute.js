import { CreateContact,ListContact,FindContactById,updateContactById, deleteContactById } from "../Controller/Contactcontroller.js";
import express from"express";
const contactRouter = express.Router();
contactRouter.post("/createcontact", CreateContact);
contactRouter.get("/list" ,ListContact);
contactRouter.get("/findcontactbyid/:id" ,FindContactById)
contactRouter.put("/updateContactById/:id",updateContactById)
contactRouter.delete("/deleteContactById/:id",deleteContactById)
export default contactRouter;
