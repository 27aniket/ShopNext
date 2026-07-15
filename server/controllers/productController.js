import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

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
                const result = await cloudinary.uploader.upload(req.file.path);
                // console.log(result)
                imageUrl = result.secure_url;
            }

            const product = new Product({
                name, description, stock, price, imageUrl, category
            });

            const saveProduct = await product.save();
            res.status(201).json(saveProduct);

        }catch(error){
                console.error(error)
            res.status(500).json({message: "Server Error"})
        }
};

export const updateProduct = async (req, res) => {
        try{
        const {name, description, stock, category, price} = req.body;
        const product = await Product.findById(req.params.id);

        if(product) {
                product.name = name || product.name;
                product.description = description || product.description;
                product.stock = stock || product.stock;
                product.category = category || product.category;
                product.price = price || product.price;
                
                if(req.file){
                        const result = await cloudinary.uploader.upload(req.file.path);
                        product.imageUrl = result.secure_url;
                }

                const updateProduct = await product.save();
                res.json(updateProduct);
        }else{
                res.status(404).json({message: "Product not found"});

        }
} catch(error){
        res.status(500).json({message: "Server Error"});
};

};

export const deleteProduct = async (req, res) => {
        try{
          const product = await Product.findById(req.params.id);

          if(product){
                await product.deleteOne();
                res.json({message: "Product Deleted"})
          }
        }catch(error){
                res.status(500).json({message: "Server Error"})
        };
};


