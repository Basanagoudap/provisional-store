const mongoose=require('mongoose');

const pendingOrdersSchema = new mongoose.Schema({
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
    buyerName: {
        required: false,
        type: String
    },
    deliveryDate: {
        required: false,
        type: Number
    },
    purchaseDate: {
        required: false,
        type: Number
    },
    address: {
        required: false,
        type: String
    },
    number: {
        required: false,
        type: String
    },
    status: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model("pending_orders", pendingOrdersSchema)