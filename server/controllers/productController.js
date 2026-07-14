import Product from "../models/Product";
import cloundinary from "../config/cloudinary";

export const getProducts = async (req, res) => {
        try{
                const products = await Product.find({});
                res.json(products)
        }catch(error){
                res.status(500).json({message: "Server Error"});
        }
};

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
};

export const createProduct = async (req, res) => {
        try {
            const {name, description, stock, price, category}  = req.body;
            let imageUrl = '';
            if(req.file){
                const result = await cloundinary.uploader.upload(req.file.path);
                const imageUrl = result.secure_url;
            }

            const product = new Product({
                name, description, stock, price, imageUrl, category
            });

            const saveProduct = await product.save();
            res.status(201).json(saveProduct);

        }catch(error){
            res.status(500).json({message: "Server Error"})
        }
}

