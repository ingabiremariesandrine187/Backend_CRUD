import Product from "../Modell/Productmodel.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

console.log("CLOUD_API_SECRET:", process.env.CLOUD_API_SECRET ? "Loaded" : "Missing");

// Create Product
export const CreateProduct = async (req, res) => {
    try {
        if (!req.files || !req.files.images || req.files.images.length === 0) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.files.images[0].path);
        const { productName, productPrice, productCategory, productDiscount } = req.body;
        const images = result.secure_url;

        const newProduct = new Product({ productName, productPrice, productCategory, productDiscount, images });
        await newProduct.save();

        res.status(201).json({ success: true, message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error(error, "Error in CreateProduct");
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// List all products
export const ListProduct = async (req, res) => {
    try {
        const foundProducts = await Product.find();
        res.status(200).json({ success: true, products: foundProducts });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Find product by ID
export const FindProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findById(id);

        if (!foundProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product: foundProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Update product by ID
export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = req.body;

        if (req.files && req.files.images) {
            const result = await cloudinary.uploader.upload(req.files.images[0].path);
            updateData.images = result.secure_url;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Delete product by ID
export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
