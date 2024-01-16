import axios from 'axios';
import { APIDOMAIN, API_BOOKS } from '../../vars';
import { setOrders } from '../slices/userData';

const getOrders = () => async (dispatch) => {
  const token = localStorage.getItem('actualT');
  try {
    const response = await axios.get(
      `${APIDOMAIN}/authorized/?route=orders&page=0&token=${token}`,
    );

    const sortedOrders = response.data.orders.sort(
      (a, b) => new Date(b.order.createdAt) - new Date(a.order.createdAt),
    );

    const allProducts = await Promise.all(
      sortedOrders.map(async (order) => {
        return Promise.all(
          order.OrderDetail.map(async (o) => {
            const responseProduct = await axios.get(
              `${API_BOOKS}/ebook/products/${o.ProductId}`,
            );
            responseProduct.data.orderDate = new Date(
              o.createdAt,
            ).toLocaleDateString('en-GB');
            return responseProduct.data;
          }),
        );
      }),
    );

    const flattenedProducts = allProducts.flat();

    console.log(flattenedProducts,"ordersss");
    dispatch(setOrders(flattenedProducts));
  } catch (error) {
    console.error(error);
  }
};

export default getOrders;
