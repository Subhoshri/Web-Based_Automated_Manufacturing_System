const Product = require('../models/Product');

exports.updateStock = async (product_id, qty) => {
    const product = await Product.findById(product_id);

    product.stock_quantity += qty;
    await product.save();

    return product;
};