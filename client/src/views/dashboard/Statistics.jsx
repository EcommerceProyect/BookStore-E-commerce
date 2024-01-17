import React, { useEffect, useState } from 'react'; // Import useState
import Dashboard from "./Dashboard";
import { useDispatch, useSelector } from 'react-redux';
import { getOrderesSuccess, getOrdersFailure, getOrdersStart } from '../../redux/slices/orders';
import { fetchOrders } from '../../redux/services/orderService';
import { getProducts } from '../../redux/services/getAllProducts';
import { getUsersStart } from '../../redux/slices/userList';
import { getUsers } from '../../redux/services/getUsers'
import SalesChart from './salesChart';
import UsersChart from './UsersChart';
export default function Statistics() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);
    const totalProducts = useSelector((state) => state.products.totalItems);
    const users = useSelector((state) => state.users.users);
    const [totalSales, setTotalSales] = useState(0);
    
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getOrdersStart());
        const ordersData = await fetchOrders(dispatch);
        let calculatedTotalSales = 0;
        ordersData.orders.forEach((Cart) => {
          calculatedTotalSales += parseFloat(Cart.totalAmount);
        });
  console.log(ordersData.orders);
        console.log('Total Sales:', calculatedTotalSales);
        setTotalSales(calculatedTotalSales);
        dispatch(getOrderesSuccess(ordersData, calculatedTotalSales));
      } catch (error) {
        dispatch(getOrdersFailure(error));
      }
    };
  
    fetchData();
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  

  useEffect(() => {
    dispatch(getUsersStart());
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div className='flex'>
    <Dashboard/>
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:py-24 lg:px-8">
    <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100/85">Estadísticas</h2>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
        <div className="dark:bg-gray-900/20 bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-textLight">Total de libros</dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-primary dark:text-gray-100/85">{totalProducts}</dd>
                </dl>
            </div>
        </div>
        <div className="dark:bg-gray-900/20 bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <dl>
                <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-textLight">Total de ventas</dt>
              <dd className="mt-1 text-3xl leading-9 font-semibold text-primary dark:text-gray-100/85">${totalSales}</dd>
                </dl>
            </div>
        </div>
        <div className="dark:bg-gray-900/20 bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-textLight">Total de usuarios</dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-primary dark:text-gray-100/85">{users.length}</dd>
                </dl>
            </div>
        </div>
    </div>
    <h2 className="mb-10 pt-12 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100/85">Ventas por día</h2>
    <SalesChart orders={orders}/>
    <h2 className="mb-10 pt-12 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100/85">Usuarios registrados por día</h2>
    <UsersChart registrations={users}/>
</div>

    </div>
  )
}
