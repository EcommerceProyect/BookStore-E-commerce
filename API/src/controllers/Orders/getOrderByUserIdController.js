/* eslint-disable no-undef */
const { Orders, Cart, CartDetail } = require("../../db");
require("dotenv").config();
const { LIMIT_USERS } = process.env;

const getOrderByUserIdController = async (id, page) => {
  const offset = page * LIMIT_USERS;

  try {
    const orders = await Orders.findAll({
      where: {
        "$Cart.UserId$": id
      },
      include: [Cart],
      offset,
      limit: LIMIT_USERS
    });

    const ordersProducts = await Promise.all(
      orders.map(async (order) => {
        const response = await CartDetail.findAll({
          where: {
            CartId: order.Cart.id
          }
        });

        return { order, OrderDetail: response };
      })
    );

    return ordersProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getOrderByUserIdController
};
