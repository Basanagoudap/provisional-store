const express = require("express");
const bodyParser = require("body-parser");
let app = express();
let mongoose = require("mongoose");
let cors = require("cors");
let owners = require("./models/owner");
let customers = require("./models/customer");
let products = require("./models/product");
let pendingOrders = require("./models/pending-orders");
require("dotenv").config();
const dbStr = process.env.DATABASE_STR;

let jsonParser = bodyParser.json();

app.use(cors());

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

app.put("/customer/update/:id", jsonParser, async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
      const result = await customers.findByIdAndUpdate(
          id, updatedData, options
      )

      res.status(200).json(result);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
});

app.get("/customer/cart-length/:email", async (req, res) => {
  try {
    const data = await customers.findOne({ email: req.params.email });
    res.status(200).json(data.cart.length);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

app.put("/product/update/:id", jsonParser, async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
      const result = await products.findByIdAndUpdate(
          id, updatedData, options
      )

      res.status(200).json(result);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
});

app.delete("/product/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await products.findByIdAndDelete(id);
    res.status(200).json(`${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/orders/getAll", async (req, res) => {
  try {
    const data = await pendingOrders.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/orders/filter", async (req, res) => {
  try {
    const status = req.query;
    const data = await pendingOrders.find(status);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

app.post("/orders/post", jsonParser, async (req, res) => {
  try {
    const data = new pendingOrders({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      quantity: req.body.quantity,
      buyerName: req.body.buyerName,
      deliveryDate: req.body.deliveryDate,
      purchaseDate: req.body.purchaseDate,
      address: req.body.address,
      number: req.body.number,
      status: req.body.status,
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
