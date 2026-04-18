const mongoose = require('mongoose');

const rawMaterialSchema = new mongoose.Schema({
    material_name: String,
    unit_price: Number,
    quantity_available: Number
});

module.exports = mongoose.model('RawMaterial', rawMaterialSchema);