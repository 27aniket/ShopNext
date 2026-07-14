import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
        name: {
                type: String,
                required: true
        },
        description: {
                type: String,
                required: true
        },
        category: {
                type: String,
                required: true
        },
        price: {
                type: Number,
                required: true
        },
        stock: {
                type: Number,
                required: true
        },
        rating: {
                type: Number,
                default: 0
        },
        numberOfReviews: {
                type: Number,
                default: 0
        },
        imageUrl: {
                type: String,
                required: true
        },
        createdAt: {
                type: Date,
                default: Date.now()
        }

})

const Product = mongoose.model("Product", productSchema)

export default Product;