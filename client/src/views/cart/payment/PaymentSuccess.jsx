import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-textGray h-screen">
      <div className=" bg-textLight flex relative top-28 flex-col items-center p-4 m-4 border border-black shadow-md rounded-lg">
        <h1>
          Factura de compra N° 1621154367-a0787f31-b60d-40e0-a415-62feb296643d
        </h1>
        <h4>Productos: producto 1</h4>
        <h4>Valor: $1000</h4>
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
