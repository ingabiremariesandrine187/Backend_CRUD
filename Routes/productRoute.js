import { CreateProduct,ListProduct,FindProductById,updateProductById,deleteProductById} from '../Controller/Productcontroller.js'
import express from"express";
import configureMulter from "../utils/multer.js"
const productRouter = express.Router();
const upload = configureMulter ();
productRouter.post("/createproduct" ,upload, CreateProduct);
productRouter.get("/list",ListProduct);
productRouter.get("/findproductbyid/:id" ,upload,FindProductById)
productRouter.put("/updateProductById/:id" ,upload,updateProductById)
productRouter.delete("/deleteProductById/:id" ,upload,deleteProductById);
export default productRouter;

