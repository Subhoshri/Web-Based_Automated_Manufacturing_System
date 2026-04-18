const Billing = require('../models/Billing');
const Order = require('../models/DealerOrder');

exports.generateBill = async (req, res) => {

    const order = await Order.findById(req.body.order_id);

    const bill = await Billing.create({
        order_id: order._id,
        order_amount: order.total_cost,
        payment_mode: "Cash"
    });

    res.json(bill);
};