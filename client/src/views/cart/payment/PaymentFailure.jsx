import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-textGray h-screen">
      <div className=" bg-textLight flex relative top-28 flex-col items-center p-4 m-4 border border-black shadow-md rounded-lg">
        <h2>La compra ha sido cancelada</h2>
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

export default PaymentFailure;
