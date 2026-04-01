const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo-service:27017/test`;

mongoose.connect(mongoURI)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

const Item = mongoose.model("Item", { name: String });

app.get("/api", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/api", async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.json(item);
});

app.listen(5000, () => console.log("Server running"));
