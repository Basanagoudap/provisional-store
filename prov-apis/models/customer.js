const mongoose=require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        required:false,
        type:String
    },
    email: {
        required:true,
        type:String
    },
    password: {
        required: false,
        type: String
    },
    address: {
        required: false,
        type: String
    },
    phone: {
        required: false,
        type: String
    },
    cart: {
        required: false,
        type: Array
    },
    pendingOrders: {
        required: false,
        type: Array
    },
    pastOrders: {
        required: false,
        type: Array
    }
})

module.exports = mongoose.model("customers",customerSchema)