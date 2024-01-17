import React, {useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';
import { format } from 'date-fns'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const SalesChart = ({ orders }) => {




    if (!Array.isArray(orders.orders)) {
    
      return <div>No hay datos de ventas disponibles.</div>;
    }
  
   
  const groupedData = orders.orders.reduce((acc, order) => {
    const orderDate = format(new Date(order.OrderDate), 'dd/MM/yy');

    if (!acc[orderDate]) {
      acc[orderDate] = {
        date: orderDate,
        Monto: 0,
      };
    }

    acc[orderDate].Monto += parseFloat(order.totalAmount);

    return acc;
  }, {});

  const chartData = Object.values(groupedData);

  const maxScrollPosition = Math.ceil(chartData.length / 10) - 1;
  const [scrollPosition, setScrollPosition] = useState(maxScrollPosition);



  const handleScrollLeft = () => {
    if (scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
    }
  };


  const handleScrollRight = () => {
    if ((scrollPosition + 1) * 10 < chartData.length) {
      setScrollPosition(scrollPosition + 1);
    }
  };

  return (
    <div className="w-full overflow-x-auto relative">
      <MdArrowBackIos onClick={handleScrollLeft} className="z-10 cursor-pointer absolute left-6 bottom-3"/>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData.slice(scrollPosition * 10, (scrollPosition + 1) * 10)}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" label={{ value: 'Fecha', position: 'insideBottom', dy: 10 }} />
          <YAxis label={{ value: 'Monto de Ventas', position: 'insideTop', angle: -90, dx: -40, dy: 100  }} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="Monto" fill="#590925" />
        </BarChart>
      </ResponsiveContainer>
      <MdArrowForwardIos onClick={handleScrollRight} className="z-10 cursor-pointer absolute right-0 bottom-3"/>
    </div>
  );
};

export default SalesChart;