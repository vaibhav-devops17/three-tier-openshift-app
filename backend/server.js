const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// 🔐 Mongo connection using OpenShift Secrets
const mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo-service:27017/test`;

mongoose.connect(mongoURI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log("Mongo Error:", err));

// 📦 Schema
const Item = mongoose.model(
  "Item",
  { name: String },
  { versionKey: false } // remove __v
);

// ❤️ HEALTH CHECK (IMPORTANT)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// 📥 GET API
app.get("/api", async (req, res) => {
  try {
    const data = await Item.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// 📤 POST API
app.post("/api", async (req, res) => {
  try {
    const item = new Item({ name: req.body.name });
    await item.save();
    res.json({ message: "Added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Insert failed" });
  }
});

// 🚀 Start server
app.listen(5000, () => console.log("Server running on port 5000"));
