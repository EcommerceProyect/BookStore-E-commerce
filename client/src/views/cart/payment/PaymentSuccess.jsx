import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BOOKS } from '../../../vars';

import {
  API_BOOKS,APIDOMAIN
} from "../../../vars";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [products,setProducts] = useState([]);

  const token = localStorage.getItem("actualT")
  useEffect(() => {
    getOrder();
  }, [token]);

  const getOrder = async () => {
    const token = localStorage.getItem("actualT");
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

      const allProducts = await Promise.all(recentOrder.OrderDetail.map(async (order) => {
        const responseProduct = await axios.get(
        `${API_BOOKS}/ebook/products/${order.ProductId}`)     
      return responseProduct.data; 
      }))

      setProducts(allProducts);

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-textGray h-screen">
      <div className=" bg-textLight flex relative top-28 flex-col items-center p-4 m-4 border border-black shadow-md rounded-lg">
        <h1>Factura de compra N° {order ? order.id : ''}</h1>
        <h4>Productos:</h4>
        {
          products ? products.map((product,index) => 
            <h1 key={index}>{product.title}</h1>
          ) : null
        }
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
