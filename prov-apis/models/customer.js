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
        type: Object
    },
    pendingOrders: {
        required: false,
        type: Object
    },
    pastOrders: {
        required: false,
        type: Object
    }
})

module.exports = mongoose.model("customers",customerSchema)