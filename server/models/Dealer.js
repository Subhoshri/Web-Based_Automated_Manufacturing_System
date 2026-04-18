const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
    dealer_name: String,
    contact: String,
    address: String,
    email: String
});

module.exports = mongoose.model('Dealer', dealerSchema);