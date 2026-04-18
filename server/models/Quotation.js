const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
    total_cost: Number,
    valid_till: Date
});

module.exports = mongoose.model('Quotation', quotationSchema);