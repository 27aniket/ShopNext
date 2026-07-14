import express, { urlencoded } from "express";
import cors from "cors"
import "dotenv/config";
import connectDB from "./config/db.js"
import authRoute from "./routes/authRoute.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("ShopNext server is working properly...")
})

// Routes
app.use("/api/auth", authRoute);
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`ShopNext server is running on ${PORT}`)
});

connectDB();
