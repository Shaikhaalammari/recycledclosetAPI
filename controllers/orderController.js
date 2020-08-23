const Order = require("../db/models/Order");
const OrderItem = require("../db/models/OrderItem");

exports.checkout = async (req, res, next) => {
  try {
    const newOrder = await Order.create({ userId: req.user.id });
    const cart = req.body.map((item) => ({
      ...item,
      orderId: newOrder.id,
    }));
    const newOrderItems = await OrderItem.bulkCreate(cart);
    res.status(201).json(newOrderItems);
  } catch (error) {
    next(error);
  }
};

// git push heroku master
