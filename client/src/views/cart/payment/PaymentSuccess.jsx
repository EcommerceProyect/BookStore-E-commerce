import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BOOKS } from '../../../vars';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `${API_BOOKS}/ebook/orders?page=0`,
      );

      const sortedOrders = data.orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      const recentOrder = sortedOrders[0];

      if (recentOrder) setOrder(recentOrder);
      console.log(recentOrder);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-textGray h-screen">
      <div className=" bg-textLight flex relative top-28 flex-col items-center p-4 m-4 border border-black shadow-md rounded-lg">
        <h1>Factura de compra N° {order ? order.id : ''}</h1>
        <h4>Productos: producto 1</h4>
        <h4>Valor: ${order ? order.totalAmount : ''}</h4>
        <h4>Dirección de envío: {order ? order.shippingAddress : ''}</h4>
        <h4>¡Gracias por su compra!</h4>
        <button
          onClick={() => navigate('/')}
          className="text-white bg-accents p-2 rounded-lg mt-4"
        >
          Página principal
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
