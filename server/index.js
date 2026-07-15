import express, { urlencoded } from "express";
import cors from "cors"
import "dotenv/config";
import connectDB from "./config/db.js"
import authRoute from "./routes/authRoute.js"
import productRoute from "./routes/productRoute.js";
// import cloudinary from "./config/cloudinary.js";

// try {
//   const result = await cloudinary.api.ping();
//   console.log(result);
// } catch (err) {
//   console.log(err);
// }

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("ShopNext server is working properly...")
})

// Routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
// app.use("/api/payment", paymentRoute);

const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`ShopNext server is running on ${PORT}`)
});

connectDB();
