const express = require("express");
const bodyParser = require("body-parser");
let app = express();
let mongoose = require("mongoose");
let cors = require("cors");
let owners = require("./models/owner");
let customers = require("./models/customer");
let products = require("./models/product");
require("dotenv").config();
const dbStr = process.env.DATABASE_STR;

let jsonParser = bodyParser.json();

app.use(cors())

mongoose.connect(dbStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.post("/owner/post", jsonParser, async (req, res) => {
  try {
    const data = new owners({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/owner/getAll", async (req, res) => {
  try {
    const data = await owners.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/owner/:email", async (req, res) => {
  try {
    const data = await owners.findOne({ email: req.params.email });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/customer/getAll", async (req, res) => {
  try {
    const data = await customers.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/customer/post", jsonParser, async (req, res) => {
  try {
    const data = new customers({
      name: req.body.name || "",
      email: req.body.email,
      password: req.body.password,
      address: req.body.address || "",
      cart: req.body.cart || [],
      pastOrders: req.body.pastOrders || [],
      pendingOrders: req.body.pendingOrders || [],
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/customer/:email", async (req, res) => {
  try {
    const data = await customers.findOne({ email: req.params.email });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/product/getAll", async (req, res) => {
  try {
    const data = await products.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/product/search/:name", async (req, res) => {
  try {
    const data = await products.find({
      name: { $regex: ".*" + req.params.name + ".*", $options: "i" },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/product/post", jsonParser, async (req, res) => {
  try {
    const data = new products({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      quantity: req.body.quantity,
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
