const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DealerOrder' },
    order_amount: Number,
    payment_mode: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Billing', billingSchema);