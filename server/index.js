import express from "express";
import cors from "cors"
import "dotenv/config";

const app = express();
app.use(cors())

app.get("/", (req, res) => {
  res.send("ShopNext server is working properly...")
})

const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`ShopNext server is running on ${PORT}`)
})
