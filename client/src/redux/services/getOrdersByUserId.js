import axios from 'axios';
import { APIDOMAIN, API_BOOKS } from '../../vars';
import { UserAdminOrderStart, getUserAdminOrdersError, setUserAdminOrders } from '../slices/userOrdersAdmin';

const getOrdersByUserId = (userId) => async (dispatch) => {
  const token = localStorage.getItem('actualT');

  dispatch(UserAdminOrderStart());
  try {
    const response = await axios.get(
      `${APIDOMAIN}/authorized/${userId}?route=adminOrders&page=0&token=${token}`,
    );

    const sortedOrders = response.data.orders.sort(
      (a, b) => new Date(b.order.createdAt) - new Date(a.order.createdAt),
    );

    //recorro las ordenes y luego las orderdetail para obtener sus productos
    const allProducts = await Promise.all(
      sortedOrders.map(async (order) => {
        return {productsDetails: await Promise.all(
          order.OrderDetail.map(async (o) => {
            const responseProduct = await axios.get(
              `${API_BOOKS}/ebook/products/${o.ProductId}`,
            );
            responseProduct.data.orderDate = new Date(
              o.createdAt,
            ).toLocaleDateString('en-GB');
            return {product:responseProduct.data,quantity:o.quantity};
          }),
        ),totalAmount:order.order.totalAmount,shippingAddress:order.order.shippingAddress,orderId:order.order.id};
      }),
    );
    
      //retorno un obj con dos propiedades que contiene  los detalles del producto y su order detail
    const flattenedProducts = allProducts.flat();

    dispatch(setUserAdminOrders(flattenedProducts));
  } catch (error) {
    dispatch(getUserAdminOrdersError(error.message));
    console.error(error);
  }
};

export default getOrdersByUserId;
