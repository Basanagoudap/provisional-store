const mongoose=require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        required:false,
        type:String
    },
    image: {
        required:true,
        type:String
    },
    price: {
        required: false,
        type: String
    },
    quantity: {
        required: false,
        type: String
    },
    description: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model("products",productSchema)