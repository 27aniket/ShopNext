import Product from "../models/Product";
import cloundinary from "../config/cloudinary";

export const getProducts = async (req, res) => {
        try{
                const products = await Product.find({});
                res.json(products)
        }catch(error){
                res.status(500).json({message: "Server Error"});
        }
}

export const getProductsById = async (req, res) => {
        try {
          const product = await Product.findById(req.params.id);
          if (product) {
            res.json(product);
          } else {
            res.status(404).json({ message: "Product Not Found" });
          }
        } catch (error) {
          res.status(500).json({ message: "Server Error" });
        }
}