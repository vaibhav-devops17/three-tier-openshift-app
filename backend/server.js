const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔐 Mongo URI from OpenShift Secrets
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongo-service:27017/test`;

// 🔌 Mongo Connection
mongoose.connect(mongoURI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log("Mongo Error:", err));

// 📦 Schema (FIXED)
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// 🔥 Model (IMPORTANT FIX)
const Item = mongoose.model("Item", itemSchema, "items");

// ❤️ Health Check (for probes)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// 📥 GET API
app.get("/api", async (req, res) => {
  try {
    const data = await Item.find();
    res.json(data);
  } catch (err) {
    console.error("GET Error:", err);
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
    console.error("POST Error:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

// 🚀 Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
