const Order = require("../models/orderModel");

const saveOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    const order = await Order.saveOrder(userId, products);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.findOrdersByUserId(userId);

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.deleteOrderById(orderId);

    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });
    
    return res.status(200).json(deletedOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { delivered } = req.body;

    const updatedOrder = await Order.updateOrderById(orderId, delivered);

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });
    
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveOrder,
  findOrdersByUserId,
  deleteOrderById,
  updateOrderById,
};
