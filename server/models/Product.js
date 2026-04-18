const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    prod_name: String,
    category: String,
    unit_price: Number,
    stock_quantity: Number
});

module.exports = mongoose.model('Product', productSchema);