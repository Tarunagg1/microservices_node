const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            productid: String,
        }
    ],
    user: String,
    total_price: Number,
    created_at: {
        type: Date,
        default: Date.now()
    }
})


module.exports = Order = mongoose.model('order', orderSchema)



