const Product = require('../models/Product');
const Order = require('../models/DealerOrder');

exports.placeOrder = async (dealer_id, items) => {

    let total = 0;

    for (let item of items) {
        const product = await Product.findById(item.product_id);

        if (!product || product.stock_quantity < item.quantity) {
            throw new Error("Stock not available");
        }

        total += product.unit_price * item.quantity;
    }

    const order = await Order.create({
        dealer_id,
        items,
        total_cost: total
    });

    return order;
};