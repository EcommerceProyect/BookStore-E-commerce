import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Logo from '../../../assets/images/Logo.svg';

import { API_BOOKS, APIDOMAIN } from '../../../vars';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem('actualT');
  useEffect(() => {
    getOrder();
  }, [token]);

  const getOrder = async () => {
    const token = localStorage.getItem('actualT');
    try {
      const { data } = await axios.get(
        `${APIDOMAIN}/authorized/?route=orders&page=0&token=${token}`,
      );

      const sortedOrders = data.orders.sort(
        (a, b) => new Date(b.order.createdAt) - new Date(a.order.createdAt),
      );
      const recentOrder = sortedOrders[0];

      if (recentOrder.order) {
        setOrder(recentOrder.order);
      }

      const allProducts = await Promise.all(
        recentOrder.OrderDetail.map(async (order) => {
          const responseProduct = await axios.get(
            `${API_BOOKS}/ebook/products/${order.ProductId}`,
          );
          return responseProduct.data;
        }),
      );

      setProducts(allProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-textGray absolute h-screen w-screen">
      <div className=" bg-textLight font-montserrat text-lg flex flex-col relative top-20 items-center p-4 m-4 border border-black shadow-md rounded-lg">
        <div className="flex m-2 p-2 w-full items-center gap-10 bg-teal-400 z-10">
          <img src={Logo} alt="Logo" className="invert" />
          <h1 className="font-bold text-2xl">
            Factura de compra N° {order ? order.id : ''}
          </h1>
        </div>
        <div className="flex flex-col items-center m-4 p-4 bg-teal-400 z-10">
          <h4>Productos:</h4>
          {products
            ? products.map((product, index) => (
                <ul>
                  <li key={index}>📖 {product.title}</li>
                </ul>
              ))
            : null}
        </div>
        <img
          src={Logo}
          alt="Logo"
          className="invert absolute top-24 size-2/3 z-0 opacity-5"
        />
        <div className="flex flex-col items-center z-10">
          <h4>Valor: ${order ? order.totalAmount : ''}</h4>
          <h4>Dirección de envío: {order ? order.shippingAddress : ''}</h4>
          <h4 className="font-bold">¡ Gracias por su compra !</h4>
          <button
            // onClick={() => navigate('/')}
            className="text-white bg-accents p-2 rounded-lg mt-4 shadow-md shadow-black transition-all active:translate-y-1"
          >
            Página principal
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
