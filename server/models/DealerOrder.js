const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    dealer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' },
    items: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ],
    total_cost: Number,
    order_status: { type: String, default: "Placed" },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DealerOrder', orderSchema);