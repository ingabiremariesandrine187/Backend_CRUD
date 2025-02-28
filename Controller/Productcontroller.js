import Product from "../Modell/Productmodel.js";
// import {cloudinary} from "../utils/cloudinaryconfig.js" 
import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


console.log("CLOUD_API_SECRET:", process.env.CLOUD_API_SECRET ? "Loaded" : "Missing"); // Debugging


export const CreateProduct = async(requestAnimationFrame, res)=>{
  
    try{
  if(!requestAnimationFrame.files || !requestAnimationFrame.files.images || requestAnimationFrame.files.images.length === 0 ){
    return res.status(400).json({ success: false,message:"No image upload" });
  }
const result = await cloudinary.uploader.upload(requestAnimationFrame.files.images[0].path);
        const{productName, productPrice, productCategory, productDiscount } = requestAnimationFrame.body;
 
        const images = result.secure_url;

        const newProduct = new Product({productName, productPrice, productCategory,  productDiscount ,images});
        
        await newProduct.save();

        res.status(201).json({success: true, message:'Product created successfully', Product: newProduct});
    }

    catch(error){
        console.log(error,"errorrrrrrrrrrrrrrrrrrrrrrrrr")
        res.status(500).json({success:false, message:'Server Error', error: error.message});

    }
}


export const ListProduct=async(req,res)=>
    {
        try{
        const foundProduct= await Product.find();
        return res.status(200).json(
            {
                foundProduct
            }
        )}
        catch(error)
        {
            res.status(500).json({success:false,
                message:"Server Error",
                error:error.message
            })
        }
    }

    
    export const FindProductById=async(req,res)=>
        {
            try{
            const id=req.params.id;
            const foundProductId=await Product.findById(id)
            if(!foundProductId)
            {
                res.status(404).json({
                    message:"Message Not found",
                })
            }
            return res.status(200).json({
                product:foundProductId
            })
        }
        catch(error)
        {
            res.status(500).json({
        
                message:"Internal server Error",
                error:error.message
            })
        }
        }

        
        export const updateProductById=async(req,res)=>{
            try{
               const{id}=req.params;
               const updatedData= await Product.findByIdAndUpdate(id,req.body);
               if(!updatedData){
                return res.status(404).json({ success: false, message: "Product not found"});
            }
            res.status(200).json({ success: true, message: "Product updated successfull",updatedData});
            }
            catch(error)
            {
                res.status(500).json({ success: false, message: "server Error", error: error.message});
            }
            }

            export const deleteProductById=async(req,res)=>{
                try{
                  const {id} =req.params;
                  const product = await Product.findByIdAndDelete(id);
                  if(!product){
                    return res.status(404).json({ success: false, message: "Contact not found"});
                   }
                   res.status(200).json({ success: true, message: "Contact deleted successfull"});
                }catch(error){
                 res.status(500).json({ success: false, message: "server Error", error: error.message});
                }
              }