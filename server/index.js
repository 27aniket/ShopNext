import express from "express";
import cors from "cors"
import "dotenv/config";
import connectDB from "./config/db.js"
import authRoute from "./routes/authRoute.js"

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("ShopNext server is working properly...")
})

// Routes
app.use("/api/auth", authRoute)

const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`ShopNext server is running on ${PORT}`)
});

connectDB();
