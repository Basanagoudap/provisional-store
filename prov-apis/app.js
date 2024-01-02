const express = require('express');
const bodyParser = require('body-parser')   
let app = express();
let mongoose = require("mongoose");
let cors = require("cors");
let owners = require('./models/owner');
require('dotenv').config();
const dbStr = process.env.DATABASE_STR;

let jsonParser = bodyParser.json();

mongoose.connect(dbStr, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.post('/post', jsonParser, async (req, res) => {
    try {
        const data = new owners({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            
        })
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
app.get('/getData', (req, res) => {
    
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});