import mongoose from "mongoose";
const {Schema,model} = mongoose;
const productSchema = new Schema(
    {
        productName:{
            type: String, 
            required: true
        },

        productPrice:{
            type: Number, 
            required: true
        },
        productCategory:{
            type: String, 
            required: false
        },
        productDiscount:{
            type: Number, 
            required: true
        },
     images:{
          type: Array, 
            required: false
         },
            
    },

    {
        timestamps: true
    }
)
const Product = model("Product", productSchema)
export default Product;