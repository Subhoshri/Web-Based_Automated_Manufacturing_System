const orderService = require('../services/orderService');

exports.placeOrder = async (req, res) => {
    try {
        const { dealer_id, items } = req.body;
        const order = await orderService.placeOrder(dealer_id, items);
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};