import { CreateProduct,ListProduct,FindProductById,updateProductById,deleteProductById} from '../Controller/Productcontroller.js'
import express from"express";
import configureMulter from "../utils/multer.js"
const productRouter = express.Router();
const upload = configureMulter ();
productRouter.post("/createproduct" ,upload, CreateProduct);
productRouter.get("/list",ListProduct);
productRouter.get("/findproductbyid/:id",FindProductById)
productRouter.put("/updateProductById/:id",updateProductById)
productRouter.delete("/deleteProductById/:id",deleteProductById);
export default productRouter;

