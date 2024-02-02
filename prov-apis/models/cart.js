const mongoose=require('mongoose');

const cartSchema = new mongoose.Schema({
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
    inCartProducts: {
        required: false,
        type: Array
    }
})

module.exports = mongoose.model("cart", cartSchema)